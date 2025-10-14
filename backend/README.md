# Documentação do backend

## 🚀 SingerSwipe Backend

Este repositório contém o backend do projeto **SingerSwipe**.  
Aqui você encontra instruções para rodar o ambiente localmente e detalhes sobre a pipeline de CI/CD.

---

## ⚙️ Setup Local

### 1. Pré-requisitos

- [Python 3.11+](https://www.python.org/)
- [Git](https://git-scm.com/)

### 2. Clonar o repositório a

```bash
git clone https://github.com/ensismoebius/projetoDsTardeTurmaAB
cd projetoDsTardeTurmaAB 
```

### 3. Abrir repositório no Visual Studio

- File > Open Folder (caso não tenha mudado o caminho do projeto) >
 `C:\Users\"seu usuario"\Documents\GitHub\projetoDsTardeTurmaAB`

## 🚀 Pipeline: Participação por Usuário

Esta pipeline do **GitHub Actions** gera uma visualização da participação dos usuários em um repositório e publica o resultado no **GitHub Pages**.

---

## ⚙️ Como funciona

A cada **push** em qualquer branch (`"**"`), a pipeline executa os seguintes passos:

---

### 1. Checkout do repositório

- 🔹 Usa `actions/checkout@v4` com `fetch-depth: 0` para obter **todo o histórico de commits**.

---

### 2. Configuração do Python

- 🔹 Instala o **Python 3.11** usando `actions/setup-python@v5`.

---

### 3. Instalação de dependências

- 🔹 Atualiza o `pip` e instala as bibliotecas necessárias:

```bash
pip install plotly requests
```

### Testes Unitarios
Rodar cobertura de testes
```pytest --cov=app --cov-report=term-missing```

### 4. Geração do arquivo HTML

🔹 Executa o script scripts/participacao.py para gerar o arquivo site/participacao.html.

🌐 Variáveis de ambiente disponíveis no script

- GITHUB_TOKEN → token de autenticação automático do GitHub Actions
- GITHUB_REPOSITORY → nome do repositório atual

### 5. Publicação do artifact

🔹 Faz o upload do arquivo participacao.html como artifact usando actions/upload-artifact@v4.

### 6.  Deploy no GitHub Pages

🔹 Publica o conteúdo da pasta site no branch gh-pages usando peaceiris/actions-gh-pages@v4.

⚠️ Configurações importantes

- force_orphan: true → cria branch gh-pages limpa

- keep_files: false → substitui arquivos antigos

- cname → insira domínio customizado se houver (opcional)

🔹 Após o deploy, a página estará disponível em:<https://ensismoebius.github.io/projetoDsTardeTurmaAB/participacao.html>

## Fim
