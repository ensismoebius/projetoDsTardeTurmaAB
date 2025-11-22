import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const GENEROS = [
  "Pop", "Rock industrial", "Metal", "MPB",
  "Sertanejo", "Hip Hop", "Hyperpop",
  "Forró", "Trap", "Gospel", "EDM", "Indie",
  "Blues", "Soul", "Funk", "Pagode"
];

const GeneroSelector = () => {
  const [selecionados, setSelecionados] = useState([]);
  const navigation = useNavigation();

  const toggleGenero = (genero) => {
    setSelecionados((prev) =>
      prev.includes(genero)
        ? prev.filter((g) => g !== genero)
        : [...prev, genero]
    );
  };

  return (
    <LinearGradient
      colors={["#8A00D4", "#E60073", "#FF7A00"]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollBox}>

          {/* Botão voltar */}
          <TouchableOpacity
            style={styles.backCircle}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={20} color="#fff" />
          </TouchableOpacity>

          {/* Ícone ilustrativo */}
          <Image
            source={require("../assets/images/Logofundo.png")}
            accessibilityLabel="Logo do aplicativo"
            style={styles.icone}
          />

          <Text style={styles.titulo}>
            Selecione seus gêneros{"\n"}musicais preferidos:
          </Text>

          {/* Chips */}
          <View style={styles.generosContainer}>
            {GENEROS.map((genero) => {
              const selected = selecionados.includes(genero);
              return (
                <TouchableOpacity
                  key={genero}
                  onPress={() => toggleGenero(genero)}
                  style={[
                    styles.generoBotao,
                    selected && styles.generoSelecionado,
                  ]}
                >
                  <Text
                    style={[
                      styles.generoTexto,
                      selected && styles.generoTextoSelecionado,
                    ]}
                  >
                    {genero}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Botão Prosseguir sem cor + borda branca */}
          <TouchableOpacity
            style={[
              styles.botaoContinuar,
            ]}
            disabled={selecionados.length === 0}
            onPress={() => console.log("Selecionados:", selecionados)}
          >
            <Text style={styles.textoContinuar}>Prosseguir</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  scrollBox: {
    alignItems: "center",
    paddingBottom: 40,
  },

  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff33",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginRight: "auto",
    marginLeft: 15,
  },

  icone: {
    width: 90,
    height: 90,
    marginTop: 10,
  },

  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginVertical: 20,
  },

  generosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "90%",
    gap: 10,
  },

  generoBotao: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#ffffff88",
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  generoSelecionado: {
    backgroundColor: "#ffffff33",
    borderColor: "#ff40b3",
  },

  generoTexto: {
    color: "#fff",
    fontSize: 15,
  },

  generoTextoSelecionado: {
    fontWeight: "bold",
    color: "#fff",
  },

  botaoContinuar: {
    width: "80%",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },

  textoContinuar: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GeneroSelector;
