import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  useWindowDimensions,
} from "react-native";

const Perfil = () => {
  const rout = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const { width } = useWindowDimensions();

  const rf = (v) => Math.round(v * (width / 390)); // responsividade

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 550,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const goTo = (p) => rout.push(`/${p}`);

  return (
    <LinearGradient
      colors={["#8a00d5", "#e60073", "#ff7a00"]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* ANIMATE VIEW */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              paddingBottom: 40,
            }}
          >
            {/* Voltar */}
            <TouchableOpacity style={styles.backButton} onPress={() => goTo("home")}>
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271220.png" }}
                style={[styles.backIcon, { width: rf(26), height: rf(26) }]}
              />
            </TouchableOpacity>

            {/* HEADER */}
            <View style={styles.headerBox}>
              <View style={styles.photoWrapper}>
                <Image
                  source={{ uri: "https://cdn-icons-png.flaticon.com/512/847/847969.png" }}
                  style={[styles.profileImage, { width: rf(130), height: rf(130) }]}
                />

                <TouchableOpacity style={styles.editPhotoBtn}>
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/1250/1250615.png",
                    }}
                    style={styles.editPhotoIcon}
                  />
                </TouchableOpacity>
              </View>

              <Text style={[styles.nome, { fontSize: rf(24) }]}>Nome-User</Text>
              <Text style={[styles.seguidores, { fontSize: rf(14) }]}>
                ?? seguidores • ?? seguindo
              </Text>

              {/* TAGS */}
              <View style={styles.deviceRow}>
                {["@INSTA", "@NAOSEI"].map((t) => (
                  <View style={styles.deviceTag} key={t}>
                    <Text style={[styles.deviceText, { fontSize: rf(13) }]}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* BIO */}
            <View style={styles.bioBox}>
              <Text style={[styles.bioText, { fontSize: rf(15) }]}>
                Biografia do usuário aqui...
              </Text>

              <TouchableOpacity style={styles.bioEditBtn}>
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/1250/1250615.png",
                  }}
                  style={[styles.editPhotoIcon, { width: rf(16), height: rf(16) }]}
                />
              </TouchableOpacity>
            </View>

            {/* GÊNEROS */}
            <View style={styles.generosContainer}>
              {["Rock", "Metal Industrial", "Forró", "Glam Rock"].map((g) => (
                <View style={styles.generoTag} key={g}>
                  <Text style={[styles.generoText, { fontSize: rf(14) }]}>{g}</Text>
                </View>
              ))}

              <TouchableOpacity style={styles.editGenerosBtn}>
                <Text style={styles.editGenerosText}>Editar gêneros</Text>
              </TouchableOpacity>
            </View>

            {/* ARTISTAS */}
            <Text style={[styles.artistasTitulo, { fontSize: rf(20) }]}>
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
                    style={[styles.artistImage, { width: rf(45), height: rf(45) }]}
                  />
                  <Text style={[styles.artistName, { fontSize: rf(16) }]}>{a}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

/* ---------------- ESTILOS MELHORADOS ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1 },

  backButton: {
    padding: 15,
    marginLeft: 5,
    marginTop: 10,
    width: 70,
  },
  backIcon: {
    tintColor: "#fff",
  },

  /* HEADER */
  headerBox: {
    alignItems: "center",
    marginTop: -10,
  },

  photoWrapper: {
    position: "relative",
  },

  profileImage: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#ffffff80",
  },

  editPhotoBtn: {
    backgroundColor: "#ff2fb1",
    width: 38,
    height: 38,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: -5,
  },

  editPhotoIcon: { width: 18, height: 18, tintColor: "#fff" },

  nome: {
    marginTop: 12,
    color: "#fff",
    fontFamily: "negrito",
  },

  seguidores: {
    color: "#f1f1f1",
    marginTop: 3,
  },

  /* TAGS */
  deviceRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  deviceTag: {
    backgroundColor: "#ffffff33",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },

  deviceText: { color: "#fff" },

  /* BIO */
  bioBox: {
    backgroundColor: "#ffffff22",
    marginTop: 25,
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ffffff70",
  },

  bioText: { color: "#fff", lineHeight: 20 },

  bioEditBtn: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },

  /* GENEROS */
  generosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    paddingHorizontal: 20,
    gap: 10,
  },

  generoTag: {
    backgroundColor: "#ffffff33",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },

  generoText: { color: "#fff" },

  editGenerosBtn: {
    backgroundColor: "#ffffff33",
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },

  editGenerosText: {
    color: "#fff",
    fontWeight: "bold",
  },

  /* ARTISTAS */
  artistasTitulo: {
    color: "#fff",
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 20,
    fontFamily: "negrito",
  },

  artistList: {
    paddingHorizontal: 20,
    gap: 12,
  },

  artistItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#ffffff25",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ffffff70",
  },

  artistImage: {
    borderRadius: 30,
  },

  artistName: { color: "#fff" },
});

export default Perfil;
