import React, {useState} from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  PixelRatio,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";

const { width, height } = Dimensions.get("window");
const RF = (size) => Math.round(PixelRatio.roundToNearestPixel(size * (width / 390)));

const Notificacoes = () => {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
      await Font.loadAsync({
        normal: require("../assets/fonts/Inter_18pt-Regular.ttf"),
        negrito: require("../assets/fonts/Inter_18pt-Bold.ttf"),
        fino: require("../assets/fonts/Inter_18pt-Thin.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();

    if (!fontsLoaded) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Carregando fontes...</Text>
        </View>
      );
    }

  return (
    <LinearGradient
      colors={["#8000d5", "#f910a3", "#fddf00"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: RF(40) }}>
       
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={RF(28)} color="#fff" />
        </TouchableOpacity>
             
        
        <View style={styles.headerContainer}>
          <Image
            source={require("../assets/images/Logofundo.png")}
            style={{ width: RF(140), height: RF(140) }}
            resizeMode="contain"
          />
          <Text style={[styles.title, { fontSize: RF(26) }]}>Notificações</Text>
        </View>

       
        <View style={styles.box}>
          
          <View style={styles.notifItem}>
            <Image source={{ uri: "" }} style={[styles.avatar, { width: RF(50), height: RF(50) }]} />
            <Text style={[styles.notifText, { fontSize: RF(16) }]}>
              <Text style={styles.nome}>Fulano</Text> Seguiu você
            </Text>
          </View>

          
          <View style={styles.notifItem}>
            <Image source={{ uri: "" }} style={[styles.avatar, { width: RF(50), height: RF(50) }]} />
            <Text style={[styles.notifText, { fontSize: RF(16) }]}>
              <Text style={styles.nome}>Nirvana</Text> Lançou uma música
            </Text>
          </View>

         
          <View style={styles.notifItem}>
            <Image source={{ uri: "" }} style={[styles.avatar, { width: RF(50), height: RF(50) }]} />
            <Text style={[styles.notifText, { fontSize: RF(16) }]}>
              <Text style={styles.nome}>Soundgarden da Silva</Text> Mandou uma mensagem
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  backButton: {
    width: RF(42),
    height: RF(42),
    backgroundColor: "rgba(208,92,255,0.85)",
    borderRadius: RF(21),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: RF(20),
    left: RF(20),
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },

  
  headerContainer: {
    alignItems: "center",
    marginTop: RF(80),
    marginBottom: RF(20),
  },
  title: {
    fontFamily: "negrito",
    color: "#fff",
    marginTop: RF(10),
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },

  
  box: {
    backgroundColor: "rgba(29,20,54,0.6)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  notifItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: RF(12),
    borderBottomColor: "rgba(255,255,255,0.2)",
    borderBottomWidth: 1,
  },
  avatar: {
    borderRadius: 50,
    marginRight: RF(12),
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  notifText: {
    color: "#fff",
    flexShrink: 1,
    fontFamily: "normal",
  },
  nome: {
    fontFamily: "negrito",
  },
});

export default Notificacoes;
