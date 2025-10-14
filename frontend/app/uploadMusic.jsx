
import { Text, TouchableOpacity, TextInput, View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Upload() {
  const roteador = useRouter();
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isGenreListVisible, setIsGenreListVisible] = useState(false);

  const genres = ['Pop', 'Rock', 'Hip Hop', 'Eletronic', 'Indie', 'Jaxx'];

  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
    setIsGenreListVisible(false); // Fechar a lista após selecionar
  };

  function voltarHome() {
    roteador.push("/")
  }

  return (
    <LinearGradient
      colors={["#fedea6", "#fc7ea7", "#7466e6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={voltarHome} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Upload de Música</Text>
          <Text style={styles.subtitle}>Compartilhe sua arte com o mundo</Text>
        </View>

        <View style={styles.form}>
          {/* Upload de Arquivo */}
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Arquivo de Áudio</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>📁 Selecionar Música</Text>
            </TouchableOpacity>
          </View>

          {/* Upload de Capa */}
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Capa do Álbum</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>🖼️ Selecionar Imagem</Text>
            </TouchableOpacity>
          </View>

          {/* Título da Música */}
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Título da Música</Text>
            <TextInput style={styles.input} placeholder="Digite o título da música" placeholderTextColor="#aaa" />
          </View>

          {/* Nome do Artista */}
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Artista</Text>
            <TextInput style={styles.input} placeholder="Seu nome artístico" placeholderTextColor="#aaa" />
          </View>

          {/* Álbum */}
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Álbum</Text>
            <TextInput style={styles.input} placeholder="Nome do álbum" placeholderTextColor="#aaa" />
          </View>

          {/* Gênero */}
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Gênero Musical</Text>
            <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setIsGenreListVisible(!isGenreListVisible)}
        >
          <Text style={styles.selectButtonText}>
            {selectedGenre || 'Selecionar Gênero'}
          </Text>
          <Text style={styles.selectArrow}>▼</Text>
        </TouchableOpacity>
          {/* Lista de Gêneros */}
        {isGenreListVisible && (
            <View style={styles.genreList}>
            {genres.map((genre) => (
                <TouchableOpacity
                key={genre}
                style={styles.genreItem}
                onPress={() => handleSelectGenre(genre)}
                >
                <Text style={styles.genreText}>{genre}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        </View>

          {/* Descrição */}
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Conte sobre sua música..."
              placeholderTextColor="#aaa"
              multiline={true}
              numberOfLines={4}
            />
          </View>

          {/* Botão de Upload */}
          <TouchableOpacity style={styles.uploadFinalButton}>
            <Text style={styles.uploadFinalButtonText}>🎵 Fazer Upload</Text>
          </TouchableOpacity>

          {/* Informações */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>📋 Informações Importantes:</Text>
            <Text style={styles.infoText}>• Formatos aceitos: MP3, WAV, FLAC</Text>
            <Text style={styles.infoText}>• Tamanho máximo: 50MB</Text>
            <Text style={styles.infoText}>• Capa: JPG, PNG (mín. 500x500px)</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "normal",
  },
  inputBlock: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "negrito",
    color: "#333",
    marginBottom: 8,
  },
  form: {
    paddingBottom: 40,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "normal",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  uploadButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  uploadButtonText: {
    fontSize: 16,
    color: "#666",
    fontFamily: "normal",
  },
  selectButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  selectButtonText: {
    fontSize: 16,
    color: "#666",
    fontFamily: "normal",
  },
  selectArrow: {
    fontSize: 12,
    color: "#666",
  },
  uploadFinalButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  uploadFinalButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "negrito",
  },
  title: {
    fontSize: 28,
    fontFamily: "negrito",
    color: "#000",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "normal",
    color: "#666",
    textAlign: "center",
  },
  infoBox: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: "negrito",
    color: "#333",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    fontFamily: "normal",
    color: "#666",
    marginBottom: 5,
  },
})
