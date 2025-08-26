#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
participacao.py

Gera um HTML com gráfico de barras (Plotly) mostrando a participação por usuário
no repositório, somando:
  - Linhas de código FUNCIONAL adicionadas por autor (ignora comentários e em branco).
  - +10 por commit que referencia e fecha issue rotulada "bug" (fixes|closes|resolves #N).
  - +2 por issue criada com label "bug".

Entradas:
  - Histórico git local (o workflow faz checkout com fetch-depth: 0).
  - GitHub API (commits e issues) via GITHUB_TOKEN.

Saída:
  - Arquivo HTML standalone (default: participacao.html).

Design:
  - Código modular, PEP8, comentários nas funções críticas.
  - Heurística leve para remover comentários por linguagem.
  - Robusto para autores sem login GitHub (usa nome do commit como fallback).
"""

from __future__ import annotations
import argparse
import collections
import json
import os
import re
import subprocess
from dataclasses import dataclass
from typing import Dict, Iterable, List, Optional, Set, Tuple

import plotly.graph_objects as go
import requests


# --------------------------- Configurações ajustáveis ---------------------------

# extensões consideradas como "código" (pode ajustar futuramente)
CODE_EXTENSIONS: Set[str] = {
    ".py", ".ipynb",  # Python (nota: .ipynb terá pouca contribuição por diff)
    ".c", ".h", ".cpp", ".hpp", ".cc", ".cxx",
    ".java", ".kt", ".scala",
    ".js", ".jsx", ".ts", ".tsx",
    ".go", ".rs",
    ".rb", ".php",
    ".m", ".mm",  # Obj-C
    ".swift",
    ".sh", ".bash", ".zsh",
    ".lua",
    ".r",
}

# tokens de comentário por linguagem (heurística simples)
SINGLE_COMMENT_TOKENS: Dict[str, Set[str]] = {
    # mapeados por extensão
    ".py": {"#"},
    ".c": {"//"},
    ".h": {"//"},
    ".cpp": {"//"},
    ".hpp": {"//"},
    ".cc": {"//"},
    ".cxx": {"//"},
    ".java": {"//"},
    ".kt": {"//"},
    ".scala": {"//"},
    ".js": {"//"},
    ".jsx": {"//"},
    ".ts": {"//"},
    ".tsx": {"//"},
    ".go": {"//"},
    ".rs": {"//"},
    ".rb": {"#"},
    ".php": {"//", "#"},
    ".m": {"//"},
    ".mm": {"//"},
    ".swift": {"//"},
    ".sh": {"#"},
    ".bash": {"#"},
    ".zsh": {"#"},
    ".lua": {"--"},
    ".r": {"#"},
}

# pares de comentários de bloco (aplicados por extensão "C-like" e HTML)
BLOCK_COMMENT_PAIRS: Dict[str, Tuple[str, str]] = {
    # chave simbólica "clike" aplicada a várias extensões
    "clike": ("/*", "*/"),
    "html": ("<!--", "-->"),
    # python: strings triplas são difíceis de distinguir de strings reais;
    # por simplicidade, ignoramos triplo-aspas como comentário de bloco.
}

CLI_CLOSES_PATTERN = re.compile(
    r"(?P<kw>fixe?s?|close?s?|resolve?s?)\s+#(?P<num>\d+)",
    re.IGNORECASE,
)

# --------------------------- Estruturas de dados ---------------------------

@dataclass
class RepoContext:
    owner: str
    name: str
    token: str
    api_base: str = "https://api.github.com"


# --------------------------- Utilidades ---------------------------

def run(cmd: List[str]) -> str:
    """Executa comando e retorna stdout (lança CalledProcessError em erro)."""
    out = subprocess.check_output(cmd, text=True, stderr=subprocess.STDOUT)
    return out


def get_repo_context() -> RepoContext:
    """Obtém owner/repo do ambiente do GitHub Actions e o token."""
    repo = os.getenv("GITHUB_REPOSITORY", "")
    if "/" not in repo:
        # fallback via git remote
        remote_url = run(["git", "config", "--get", "remote.origin.url"]).strip()
        # tentativa de extrair owner/repo de SSH/HTTPS
        m = re.search(r"[:/](?P<owner>[^/]+)/(?P<name>[^/\.]+)(?:\.git)?$", remote_url)
        if not m:
            raise RuntimeError("não foi possível determinar owner/repo")
        owner, name = m.group("owner"), m.group("name")
    else:
        owner, name = repo.split("/", 1)

    token = os.getenv("GITHUB_TOKEN", "")
    if not token:
        raise RuntimeError("GITHUB_TOKEN ausente do ambiente.")
    return RepoContext(owner=owner, name=name, token=token)


def gh_get(ctx: RepoContext, path: str, params: Optional[Dict[str, str]] = None) -> dict:
    """GET simples na API do GitHub (lida com paginação básica)."""
    url = f"{ctx.api_base}{path}"
    headers = {"Authorization": f"Bearer {ctx.token}", "Accept": "application/vnd.github+json"}
    items: List[dict] = []
    page = 1
    while True:
        p = {} if params is None else dict(params)
        p.update({"per_page": "100", "page": str(page)})
        r = requests.get(url, headers=headers, params=p, timeout=30)
        r.raise_for_status()
        data = r.json()
        if isinstance(data, list):
            items.extend(data)
            if len(data) < 100:
                return {"items": items}
            page += 1
        else:
            return data


def list_all_issue_events(ctx: RepoContext) -> List[dict]:
    """Lista todas as issues (abertas/fechadas) com meta suficiente para contagem +2."""
    path = f"/repos/{ctx.owner}/{ctx.name}/issues"
    # Inclui issues e PRs; vamos filtrar PRs. Queremos histórico completo:
    items: List[dict] = []
    page = 1
    while True:
        resp = gh_get(ctx, path, params={"state": "all", "page": str(page), "per_page": "100"})
        batch = resp["items"]
        if not batch:
            break
        items.extend(batch)
        if len(batch) < 100:
            break
        page += 1
    return items


def get_commit_info(ctx: RepoContext, sha: str) -> dict:
    """Obtém metadados de commit, incluindo author.login (quando disponível)."""
    path = f"/repos/{ctx.owner}/{ctx.name}/commits/{sha}"
    return gh_get(ctx, path)


def list_commit_shas() -> List[str]:
    """Retorna todos os SHAs do histórico (merge e non-merge)."""
    out = run(["git", "rev-list", "--all"])
    shas = [s for s in out.strip().splitlines() if s]
    return shas


def list_commit_patches(sha: str) -> List[Tuple[str, List[str]]]:
    """
    Para um commit, retorna lista de (arquivo, linhas_adicionadas_em_patch).
    Linhas incluem apenas as que começam com '+' no patch (exclui '+++').
    """
    out = run(["git", "show", "--format=", "--unified=0", "--patch", sha])
    files_and_lines: List[Tuple[str, List[str]]] = []
    current_file: Optional[str] = None
    added_lines: List[str] = []

    for line in out.splitlines():
        if line.startswith("diff --git "):
            # finaliza o arquivo anterior
            if current_file is not None:
                files_and_lines.append((current_file, added_lines))
            # inicia novo
            current_file = None
            added_lines = []
        elif line.startswith("+++ b/"):
            # captura caminho destino
            current_file = line[6:].strip()
        elif line.startswith("+") and not line.startswith("+++"):
            added_lines.append(line[1:])  # remove prefixo '+'

    if current_file is not None:
        files_and_lines.append((current_file, added_lines))
    return files_and_lines


def file_ext(path: str) -> str:
    m = re.search(r"(\.[A-Za-z0-9_]+)$", path)
    return m.group(1).lower() if m else ""


def count_functional_lines_for_file(added_lines: List[str], ext: str) -> int:
    """
    Conta "linhas funcionais" em um conjunto de linhas adicionadas de um arquivo.
    Regras:
      - ignora vazias/whitespace
      - ignora linhas que começam com token de comentário da linguagem
      - ignora trechos dentro de comentários de bloco (heurística p/ C-like e HTML)
    """
    single_tokens = SINGLE_COMMENT_TOKENS.get(ext, set())
    block_pair = None
    if ext in {".c", ".h", ".cpp", ".hpp", ".cc", ".cxx", ".java", ".kt", ".scala",
               ".js", ".jsx", ".ts", ".tsx", ".go", ".rs", ".php", ".m", ".mm", ".swift"}:
        block_pair = BLOCK_COMMENT_PAIRS["clike"]
    elif ext in {".html", ".xml"}:
        block_pair = BLOCK_COMMENT_PAIRS["html"]

    in_block = False
    start_block = block_pair[0] if block_pair else None
    end_block = block_pair[1] if block_pair else None

    count = 0
    for raw in added_lines:
        line = raw.strip()
        if not line:
            continue

        # bloco de comentários (C-like / HTML)
        if block_pair:
            if in_block:
                if end_block in line:
                    # fecha bloco; descarta parte anterior ao terminador
                    post = line.split(end_block, 1)[1].strip()
                    in_block = False
                    # reavalia resto da linha após fechamento
                    line = post
                else:
                    # ainda dentro do bloco -> ignora
                    continue

            # abre bloco?
            if start_block in line:
                pre, post = line.split(start_block, 1)
                # se há código útil antes do início do bloco
                if pre.strip():
                    # mantém apenas a parte antes do comentário para avaliar
                    line = pre.strip()
                else:
                    # entra no bloco e ignora linha
                    in_block = True
                    # verifica se fecha no mesmo line
                    if end_block and end_block in post:
                        # comentário inline /* ... */ em uma única linha
                        after = post.split(end_block, 1)[1].strip()
                        in_block = False
                        if not after:
                            continue
                        line = after
                    else:
                        continue

        # comentários de linha
        if single_tokens:
            is_comment_line = any(line.startswith(tok) for tok in single_tokens)
            if is_comment_line:
                continue

        # heurísticas extras triviais
        if ext in {".py"} and line.startswith(('"""', "'''")):
            # ignora prováveis docstrings de abertura simples
            continue

        count += 1

    return count


def parse_issue_refs_from_message(message: str) -> Set[int]:
    """Extrai números de issues referenciados via fixes/closes/resolves #N."""
    refs: Set[int] = set()
    for m in CLI_CLOSES_PATTERN.finditer(message):
        refs.add(int(m.group("num")))
    return refs


def resolve_author_identity(commit_payload: dict) -> str:
    """
    Retorna um identificador de autor estável:
      - author.login quando disponível,
      - senão commit.author.name.
    """
    gh_author = commit_payload.get("author")
    if isinstance(gh_author, dict) and gh_author.get("login"):
        return gh_author["login"]
    # fallback para nome do commit
    name = (commit_payload.get("commit", {}) or {}).get("author", {}) or {}
    return name.get("name") or "desconhecido"


def compute_participation(ctx: RepoContext) -> Dict[str, int]:
    """
    Núcleo da contagem:
      1) Soma linhas funcionais adicionadas por autor (por commit).
      2) +10 por commit que fecha issue com label 'bug'.
      3) +2 por issue criada com label 'bug'.
    Retorna dict {autor: pontuacao}.
    """
    scores: Dict[str, int] = collections.defaultdict(int)

    # (3) +2 por issue 'bug' criada
    issues = list_all_issue_events(ctx)
    for it in issues:
        if "pull_request" in it:
            continue  # ignora PRs
        labels = {lbl["name"].lower() for lbl in it.get("labels", [])}
        if "bug" in labels:
            user = (it.get("user") or {}).get("login") or "desconhecido"
            scores[user] += 2

    # mapa de issue->tem_label_bug
    is_bug_issue: Dict[int, bool] = {}
    for it in issues:
        if "pull_request" in it:
            continue
        labels = {lbl["name"].lower() for lbl in it.get("labels", [])}
        number = it.get("number")
        if number is not None:
            is_bug_issue[number] = ("bug" in labels)

    # (1) linhas funcionais + (2) bônus por fechar bug
    shas = list_commit_shas()
    for sha in shas:
        # patch por arquivo
        file_patches = list_commit_patches(sha)
        # metadados para autor e mensagem
        payload = get_commit_info(ctx, sha)
        author_id = resolve_author_identity(payload)
        message = (payload.get("commit", {}) or {}).get("message", "") or ""

        add_lines_this_commit = 0
        for path, added in file_patches:
            ext = file_ext(path)
            if ext not in CODE_EXTENSIONS:
                continue
            add_lines_this_commit += count_functional_lines_for_file(added, ext)

        scores[author_id] += add_lines_this_commit

        # (2) bônus por fechar bug
        refs = parse_issue_refs_from_message(message)
        for num in refs:
            if is_bug_issue.get(num, False):
                scores[author_id] += 10

    return dict(scores)


def make_bar_chart_html(scores: Dict[str, int], out_path: str) -> None:
    """
    Gera HTML standalone com gráfico de barras.
    Requisitos:
      - gráfico de barras
      - nome do usuário visível na frente da barra correspondente
    """
    # ordena por pontuação desc
    items = sorted(scores.items(), key=lambda kv: kv[1], reverse=True)
    users = [u for u, _ in items]
    values = [v for _, v in items]

    # texto sobre as barras: nome + valor
    text_labels = [f"{u}: {v}" for u, v in items]

    fig = go.Figure(
        data=[
            go.Bar(
                x=values,
                y=users,
                orientation="h",
                text=text_labels,
                textposition="outside",
                hovertemplate="%{y}: %{x} linhas<extra></extra>",
            )
        ]
    )
    fig.update_layout(
        title="participação por usuário (linhas funcionais + bônus de bugs)",
        xaxis_title="pontuação (linhas equivalentes)",
        yaxis_title="usuários",
        bargap=0.25,
        height=max(400, 30 * max(1, len(users))),
        margin=dict(l=120, r=40, t=60, b=40),
    )

    # grava HTML standalone (inclui JS embutido)
    fig.write_html(out_path, include_plotlyjs="cdn", full_html=True)


def main() -> None:
    parser = argparse.ArgumentParser(description="Gera participacao.html com gráfico de barras.")
    parser.add_argument(
        "--out",
        default="site/participacao.html",   # <<< alterado para gerar no diretório site
        help="arquivo de saída HTML"
    )
    args = parser.parse_args()

    os.makedirs(os.path.dirname(args.out), exist_ok=True)  # garante diretório
    ctx = get_repo_context()
    scores = compute_participation(ctx)
    make_bar_chart_html(scores, args.out)
    print(json.dumps(scores, ensure_ascii=False, indent=2))
    print(f"OK: gerado {args.out}")



if __name__ == "__main__":
    main()

