import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  ScrollView,
  Animated,
  useWindowDimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";

const GENEROS = [
  "Pop", "Rock industrial", "Metal", "MPB", "Sertanejo",
  "Hip Hop", "Hyperpop", "Forró", "Trap", "Gospel",
  "EDM", "Indie", "Blues", "Soul", "Funk", "Pagode"
];

const GeneroSelector = () => {
  const [selecionados, setSelecionados] = useState([]);
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const tapAnim = useRef(new Animated.Value(1)).current;
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const { width } = useWindowDimensions();

  
  const rf = (size) => Math.round(size * (width / 390));

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
      iconSize: rf(110),
      titleSize: rf(22),
      chipFont: rf(15),
      continueFont: rf(18),
      chipPaddingV: rf(8),
      chipPaddingH: rf(16),
      backBtn: rf(40),
      backIcon: rf(20),
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

  const animateTap = () => {
    Animated.sequence([
      Animated.timing(tapAnim, {
        toValue: 0.93,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(tapAnim, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const toggleGenero = (genero) => {
    animateTap();
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
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollBox}>

          
          <TouchableOpacity
            style={[
              styles.backCircle,
              {
                width: dyn.backBtn,
                height: dyn.backBtn,
                borderRadius: dyn.backBtn / 2,
              },
            ]}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={dyn.backIcon} color="#fff" />
          </TouchableOpacity>

        
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              alignItems: "center",
              width: "100%",
            }}
          >
            <Image
              source={require("../assets/images/Logofundo.png")}
              accessibilityLabel="Logo do aplicativo"
              style={[styles.icone, { width: dyn.iconSize, height: dyn.iconSize }]}
            />

            <Text style={[styles.titulo, { fontSize: dyn.titleSize }]}>
              Selecione seus gêneros{"\n"}musicais preferidos:
            </Text>

          
            <Animated.View
              style={[
                styles.generosContainer,
                { transform: [{ scale: tapAnim }] },
              ]}
            >
              {GENEROS.map((genero) => {
                const selected = selecionados.includes(genero);

                return (
                  <TouchableOpacity
                    key={genero}
                    onPress={() => toggleGenero(genero)}
                    style={[
                      styles.generoBotao,
                      {
                        paddingVertical: dyn.chipPaddingV,
                        paddingHorizontal: dyn.chipPaddingH,
                      },
                      selected && styles.generoSelecionado,
                    ]}
                  >
                    <Text
                      style={[
                        styles.generoTexto,
                        { fontSize: dyn.chipFont },
                        selected && styles.generoTextoSelecionado,
                      ]}
                    >
                      {genero}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </Animated.View>

         
            <TouchableOpacity
              style={[
                styles.botaoContinuar,
                selecionados.length === 0 && { opacity: 0.4 },
              ]}
              disabled={selecionados.length === 0}
              onPress={() => console.log("Selecionados:", selecionados)}
            >
              <Text style={[styles.textoContinuar, { fontSize: dyn.continueFont }]}>
                Prosseguir
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  scrollBox: {
    alignItems: "center",
    paddingBottom: 50,
  },

  backCircle: {
    backgroundColor: "#ffffff33",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 15,
    alignSelf: "flex-start",
  },

  icone: {
    resizeMode: "contain",
    marginTop: 15,
  },

  titulo: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "negrito",
    marginVertical: 20,
  },

  generosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "90%",
    gap: 10,
    marginBottom: 30,
  },

  generoBotao: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#ffffff66",
    backgroundColor: "rgba(255, 255, 255, 0.18)",
  },

  generoSelecionado: {
    backgroundColor: "#ffffff33",
    borderColor: "#ff40b3",
  },

  generoTexto: {
    color: "#fff",
    fontFamily: "normal",
  },

  generoTextoSelecionado: {
    color: "#fff",
    fontFamily: "negrito",
  },

  botaoContinuar: {
    width: "80%",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginTop: 10,
  },

  textoContinuar: {
    color: "#fff",
    fontFamily: "negrito",  
  },
});

export default GeneroSelector;
