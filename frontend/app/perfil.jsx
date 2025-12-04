import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  PixelRatio,
} from "react-native";
import * as Font from "expo-font";

const { width, height } = Dimensions.get("window");


const RF = (size) => {
  const scale = width / 390;         
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const Perfil = () => {
  const rout = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(25)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const loadFonts = async () => {
      await Font.loadAsync({
        normal: require("../assets/fonts/Inter_18pt-Regular.ttf"),
        negrito: require("../assets/fonts/Inter_18pt-Bold.ttf"),
        fino: require("../assets/fonts/Inter_18pt-Thin.ttf"),
      });
      setFontsLoaded(true);
    };

  useEffect(() => {
    loadFonts();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 650,
        easing: (t) => t,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 650,
        easing: (t) => Math.sqrt(t),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 90,
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

  const goTo = (p) => rout.push(`/${p}`);

  return (
    <LinearGradient
      colors={["#8a00d5", "#e60073", "#ff7a00"]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={true}
          contentContainerStyle={{ paddingBottom: RF(40) }}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [
                { translateY: translateAnim },
                { scale: scaleAnim },
              ],
            }}
          >
           
            <TouchableOpacity style={styles.backButton} onPress={() => goTo("home")}>
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271220.png" }}
                style={[styles.backIcon, { width: RF(26), height: RF(26) }]}
              />
            </TouchableOpacity>

           
            <View style={styles.headerBox}>
              <View style={styles.photoWrapper}>
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
                  }}
                  style={[
                    styles.profileImage,
                    { width: RF(140), height: RF(140) },
                  ]}
                />

                <TouchableOpacity style={styles.editPhotoBtn}>
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/1250/1250615.png",
                    }}
                    style={[styles.editPhotoIcon, { width: RF(16), height: RF(16) }]}
                  />
                </TouchableOpacity>
              </View>

              <Text style={[styles.nome, { fontSize: RF(25) }]}>Nome-User</Text>
              <Text style={[styles.seguidores, { fontSize: RF(14) }]}>
                ?? seguidores • ?? seguindo
              </Text>

             
              <View style={styles.deviceRow}>
                {["@INSTA", "@NAOSEI"].map((t) => (
                  <View style={styles.deviceTag} key={t}>
                    <Text style={[styles.deviceText, { fontSize: RF(13) }]}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>

           
            <View style={styles.bioBox}>
              <Text style={[styles.bioText, { fontSize: RF(15) }]}>
                Biografia do usuário aqui...
              </Text>

              <TouchableOpacity style={styles.bioEditBtn}>
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/1250/1250615.png",
                  }}
                  style={[styles.editPhotoIcon, { width: RF(16), height: RF(16) }]}
                />
              </TouchableOpacity>
            </View>

            
            <View style={styles.generosContainer}>
              {["Rock", "Metal Industrial", "Forró", "Glam Rock"].map((g) => (
                <View style={styles.generoTag} key={g}>
                  <Text style={[styles.generoText, { fontSize: RF(14) }]}>{g}</Text>
                </View>
              ))}

              <TouchableOpacity style={styles.editGenerosBtn}>
                <Text style={[styles.editGenerosText, { fontSize: RF(14) }]}>
                  Editar gêneros
                </Text>
              </TouchableOpacity>
            </View>

           
            <Text style={[styles.artistasTitulo, { fontSize: RF(20) }]}>
              Artistas mais ouvidos
            </Text>

            <View style={styles.artistList}>
              {[
                "Jackson do Pandeiro",
                "Nirvana",
                "Marilyn Manson",
                "Iron Maiden",
                "Queen",
              ].map((a) => (
                <View style={styles.artistItem} key={a}>
                  <Image
                    source={{
                      uri: "https://i.ibb.co/4Sk4G0M/person-placeholder.png",
                    }}
                    style={[styles.artistImage, { width: RF(45), height: RF(45) }]}
                  />
                  <Text style={[styles.artistName, { fontSize: RF(16) }]}>{a}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};



const styles = StyleSheet.create({
  container: { flex: 1 },

  backButton: {
    paddingVertical: RF(12),
    paddingHorizontal: RF(15),
    marginLeft: RF(5),
    marginTop: RF(10),
  },
  backIcon: { tintColor: "#fff" },

  headerBox: {
    alignItems: "center",
    marginTop: RF(-5),
  },

  photoWrapper: { position: "relative" },

  profileImage: {
    borderRadius: 200,
    borderWidth: 3,
    borderColor: "#ffffff80",
  },

  editPhotoBtn: {
    backgroundColor: "#ff2fb1",
    width: RF(40),
    height: RF(40),
    borderRadius: RF(25),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 2,
    right: RF(-8),
  },

  editPhotoIcon: { tintColor: "#fff" },

  nome: {
    marginTop: RF(12),
    color: "#fff",
    fontFamily: "negrito",
  },

  seguidores: {
    color: "#f1f1f1",
    marginTop: RF(3),
  },

  deviceRow: {
    flexDirection: "row",
    gap: RF(10),
    marginTop: RF(12),
  },

  deviceTag: {
    backgroundColor: "#ffffff33",
    paddingVertical: RF(5),
    paddingHorizontal: RF(14),
    borderRadius: RF(20),
    borderWidth: 1,
    borderColor: "#fff",
  },

  deviceText: { color: "#fff", fontFamily: "normal" },

  bioBox: {
    backgroundColor: "#ffffff22",
    marginTop: RF(25),
    marginHorizontal: RF(20),
    padding: RF(18),
    borderRadius: RF(15),
    borderWidth: 1,
    borderColor: "#ffffff70",
  },

  bioText: { color: "#fff", lineHeight: RF(20), fontFamily: "normal" },

  bioEditBtn: {
    position: "absolute",
    right: RF(10),
    bottom: RF(10),
  },

  generosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: RF(20),
    paddingHorizontal: RF(20),
    gap: RF(10),
  },

  generoTag: {
    backgroundColor: "#ffffff33",
    paddingVertical: RF(6),
    paddingHorizontal: RF(14),
    borderRadius: RF(20),
    borderWidth: 1,
    borderColor: "#fff",
  },

  generoText: { color: "#fff", fontFamily: "normal" },

  editGenerosBtn: {
    backgroundColor: "#ffffff33",
    paddingVertical: RF(7),
    paddingHorizontal: RF(14),
    borderRadius: RF(20),
    borderWidth: 1,
    borderColor: "#fff",
  },

  editGenerosText: {
    color: "#fff",
    fontFamily: "negrito",
  },

  artistasTitulo: {
    color: "#fff",
    marginTop: RF(30),
    marginBottom: RF(10),
    paddingHorizontal: RF(20),
    fontFamily: "negrito",
  },

  artistList: {
    paddingHorizontal: RF(20),
    gap: RF(12),
  },

  artistItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: RF(12),
    backgroundColor: "#ffffff25",
    padding: RF(12),
    borderRadius: RF(12),
    borderWidth: 1,
    borderColor: "#ffffff70",
  },

  artistImage: { borderRadius: 50 },

  artistName: { color: "#fff", fontFamily: "negrito" },
});

export default Perfil;
