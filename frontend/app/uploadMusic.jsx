import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Animated,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";

export default function Upload() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const [selectedGenre, setSelectedGenre] = useState("");
  const [isGenreListVisible, setIsGenreListVisible] = useState(false);

  const { width } = useWindowDimensions();

 
  const rf = (size) => Math.round(size * (width / 390));

  const genres = ["Pop", "Rock", "Hip Hop", "Eletronic", "Indie", "Jaxx"];

  const loadFonts = async () => {
      await Font.loadAsync({
        normal: require("../assets/fonts/Inter_18pt-Regular.ttf"),
        negrito: require("../assets/fonts/Inter_18pt-Bold.ttf"),
        fino: require("../assets/fonts/Inter_18pt-Thin.ttf"),
      });
      setFontsLoaded(true);
    };

  const dyn = useMemo(
    () => ({
      title: rf(28),
      subtitle: rf(16),
      label: rf(16),
      input: rf(18),
      button: rf(18),
      info: rf(15),
      backSize: rf(32),
    }),
    [width]
  );

 
  useEffect(() => {
    loadFonts();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (!fontsLoaded) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Carregando fontes...</Text>
        </View>
      );
    }

  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
    setIsGenreListVisible(false);
  };

  return (
    <LinearGradient
      colors={["#8000d5", "#f910a3", "#fddf00"]}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
      
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            width: "100%",
            alignItems: "center",
          }}
        >
       
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={[styles.backArrow, { fontSize: dyn.backSize }]}>
                ←
              </Text>
            </TouchableOpacity>

            <Text style={[styles.title, { fontSize: dyn.title }]}>
              Upload de Música
            </Text>
            <Text style={[styles.subtitle, { fontSize: dyn.subtitle }]}>
              Compartilhe sua arte com o mundo
            </Text>
          </View>

         
           <View style={styles.form}>
            <View style={styles.block}>
              <Text style={[styles.label, { fontSize: dyn.label }]}>
                Arquivo de Áudio
              </Text>
              <TouchableOpacity style={styles.button}>
                <Text style={[styles.buttonText, { fontSize: dyn.button }]}>
                  📁 Selecionar Música
                </Text>
              </TouchableOpacity>
            </View>

          
            <View style={styles.block}>
              <Text style={[styles.label, { fontSize: dyn.label }]}>
                Capa do Álbum
              </Text>
              <TouchableOpacity style={styles.button}>
                <Text style={[styles.buttonText, { fontSize: dyn.button }]}>
                  🖼️ Selecionar Imagem
                </Text>
              </TouchableOpacity>
            </View>

            
            {[
              { label: "Título da Música", ph: "Digite o título" },
              { label: "Artista", ph: "Seu nome artístico" },
              { label: "Álbum", ph: "Nome do álbum" },
            ].map((item, i) => (
              <View style={styles.block} key={i}>
                <Text style={[styles.label, { fontSize: dyn.label }]}>
                  {item.label}
                </Text>
                <TextInput
                  style={[styles.input, { fontSize: dyn.input }]}
                  placeholder={item.ph}
                  placeholderTextColor="#bbb"
                />
              </View>
            ))}

          
            <View style={styles.block}>
              <Text style={[styles.label, { fontSize: dyn.label }]}>
                Gênero Musical
              </Text>

              <TouchableOpacity
                style={styles.select}
                onPress={() => setIsGenreListVisible(!isGenreListVisible)}
              >
                <Text style={[styles.buttonText, { fontSize: dyn.button }]}>
                  {selectedGenre || "Selecionar Gênero"}
                </Text>
                <Text style={styles.arrow}>▼</Text>
              </TouchableOpacity>

              {isGenreListVisible && (
                <View style={styles.dropdown}>
                  {genres.map((g) => (
                    <TouchableOpacity
                      key={g}
                      onPress={() => handleSelectGenre(g)}
                      style={styles.dropdownItem}
                    >
                      <Text
                        style={[
                          styles.dropdownText,
                          { fontSize: dyn.button },
                        ]}
                      >
                        {g}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            
            <View style={styles.block}>
              <Text style={[styles.label, { fontSize: dyn.label }]}>
                Descrição
              </Text>
              <TextInput
                style={[styles.input, styles.textArea, { fontSize: dyn.input }]}
                placeholder="Conte sobre sua música..."
                placeholderTextColor="#bbb"
                multiline
              />
            </View>

          
            <TouchableOpacity style={styles.uploadFinal}>
              <Text style={[styles.uploadFinalText, { fontSize: dyn.button }]}>
                🎵 Fazer Upload
              </Text>
            </TouchableOpacity>

            <View style={styles.info}>
              <Text style={[styles.infoTitle, { fontSize: dyn.label }]}>
                📋 Informações Importantes:
              </Text>
              <Text style={[styles.infoText, { fontSize: dyn.info }]}>
                • Formatos aceitos: MP3, WAV, FLAC
              </Text>
              <Text style={[styles.infoText, { fontSize: dyn.info }]}>
                • Tamanho máximo: 50MB
              </Text>
              <Text style={[styles.infoText, { fontSize: dyn.info }]}>
                • Capa: JPG, PNG (mín. 500x500px)
              </Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingVertical: 40,
    paddingHorizontal: 22,
    alignItems: "center",
  },

  header: { alignItems: "center", width: "100%" },

  backButton: { position: "absolute", top: 0, left: 0 },
  backArrow: { color: "#FFF", fontWeight: "bold" },

  title: { color: "#FFF", fontFamily: "negrito" },
  subtitle: { color: "#FFF", opacity: 0.9, fontFamily:"fino" },

  form: {
    width: "92%",
    maxWidth: 480,
    marginTop: 30,
  },

  block: { marginBottom: 22 },


  label: { color: "#FFF", marginBottom: 8 },

 
  input: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFFFFFaa",
    backgroundColor: "rgba(255,255,255,0.12)",
    color: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontFamily: "normal",
  },

  textArea: {
    height: 120,
    textAlignVertical: "top",
  },

 
  button: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFF",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontFamily: "normal",
  },

  select: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFF",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  arrow: {
    fontSize: 16,
    color: "#FFF",
  },

  dropdown: {
    marginTop: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFF",
    backgroundColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
  },

  dropdownItem: {
    paddingVertical: 12,
  },

  dropdownText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "normal",
  },

  
  uploadFinal: {
    marginTop: 25,
    borderRadius: 30,
    backgroundColor: "#1d1436",
    borderColor: "#8000D5",
    borderWidth: 2,
    paddingVertical: 18,
    alignItems: "center",
  },

  uploadFinalText: {
    color: "#FFF",
    fontFamily: "negrito",
  },

  info: {
    marginTop: 25,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 2,
    borderColor: "#FFF",
  },

  infoTitle: {
    color: "#FFF",
    marginBottom: 10,
    fontFamily: "negrito",
  },

  infoText: {
    color: "#FFF",
    marginBottom: 6,
    fontFamily: "fino",
  },
});
