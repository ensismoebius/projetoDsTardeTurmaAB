import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Perfil = () => {
  const rout = useRouter();

  const goTo = (path) => rout.push(`/${path}`);

  return (
    <LinearGradient
      colors={["#8a00d4", "#e60073", "#ff7a00"]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        
        {/* SCROLLVIEW ADICIONADO AQUI */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* BOTÃO DE VOLTAR */}
          <TouchableOpacity style={styles.backButton} onPress={() => goTo("home")}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/271/271220.png",
              }}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          {/* FOTO + NOME */}
          <View style={styles.headerBox}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
              }}
              style={styles.profileImage}
            />

            {/* Botão editar foto */}
            <TouchableOpacity style={styles.editPhotoBtn}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/1250/1250615.png",
                }}
                style={styles.editPhotoIcon}
              />
            </TouchableOpacity>

            <Text style={styles.nome}>Nome-User</Text>
            <Text style={styles.seguidores}>?? seguidores • ?? seguindo</Text>

            {/* Tags */}
            <View style={styles.deviceRow}>
              <View style={styles.deviceTag}>
                <Text style={styles.deviceText}>@INSTA</Text>
              </View>

              <View style={styles.deviceTag}>
                <Text style={styles.deviceText}>@NAOSEI</Text>
              </View>
            </View>
          </View>

          {/* BIO */}
          <View style={styles.bioBox}>
            <Text style={styles.bioText}>
              biografia {"\n"}do usuario
            </Text>

            <TouchableOpacity style={styles.bioEditBtn}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/1250/1250615.png",
                }}
                style={styles.editPhotoIcon}
              />
            </TouchableOpacity>
          </View>

          {/* GÊNEROS */}
          <View style={styles.generosContainer}>
            <View style={styles.generoTag}>
              <Text style={styles.generoText}>Rock</Text>
            </View>

            <View style={styles.generoTag}>
              <Text style={styles.generoText}>Metal industrial</Text>
            </View>

            <View style={styles.generoTag}>
              <Text style={styles.generoText}>Forró</Text>
            </View>

            <View style={styles.generoTag}>
              <Text style={styles.generoText}>Glam Rock</Text>
            </View>

            <TouchableOpacity style={styles.editGenerosBtn}>
              <Text style={styles.editGenerosText}>Editar gêneros..</Text>
            </TouchableOpacity>
          </View>

          {/* ARTISTAS */}
          <Text style={styles.artistasTitulo}>Artistas mais ouvidos</Text>

          <View style={styles.artistList}>
            <View style={styles.artistItem}>
              <Image
                source={{ uri: "https://i.ibb.co/4Sk4G0M/person-placeholder.png" }}
                style={styles.artistImage}
              />
              <Text style={styles.artistName}>Jackson do Pandeiro</Text>
            </View>

            <View style={styles.artistItem}>
              <Image
                source={{ uri: "https://i.ibb.co/4Sk4G0M/person-placeholder.png" }}
                style={styles.artistImage}
              />
              <Text style={styles.artistName}>Nirvana</Text>
            </View>

            <View style={styles.artistItem}>
              <Image
                source={{ uri: "https://i.ibb.co/4Sk4G0M/person-placeholder.png" }}
                style={styles.artistImage}
              />
              <Text style={styles.artistName}>Marilyn Manson</Text>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  backButton: {
    padding: 15,
    marginTop: 10,
  },
  backIcon: {
    width: 28,
    height: 28,
    tintColor: "#fff",
  },

  headerBox: {
    alignItems: "center",
    marginTop: -5,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 70,
  },

  editPhotoBtn: {
    backgroundColor: "#ff2fb1",
    width: 34,
    height: 34,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 90,
    right: 130,
  },

  editPhotoIcon: {
    width: 18,
    height: 18,
    tintColor: "#fff",
  },

  nome: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },

  seguidores: {
    color: "#eee",
    fontSize: 14,
    marginTop: 2,
  },

  deviceRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },

  deviceTag: {
    backgroundColor: "#ffffff33",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },

  deviceText: {
    color: "#fff",
    fontSize: 13,
  },

  bioBox: {
    backgroundColor: "#ffffff33",
    marginTop: 20,
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#fff",
    position: "relative",
  },

  bioText: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 20,
  },

  bioEditBtn: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },

  generosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    paddingHorizontal: 15,
    gap: 8,
  },

  generoTag: {
    backgroundColor: "#ffffff33",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },

  generoText: {
    color: "#fff",
    fontSize: 14,
  },

  editGenerosBtn: {
    backgroundColor: "#ffffff55",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: 5,
  },

  editGenerosText: {
    color: "#fff",
    fontWeight: "bold",
  },

  artistasTitulo: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 25,
    paddingHorizontal: 15,
  },

  artistList: {
    marginTop: 10,
    paddingHorizontal: 15,
    gap: 10,
  },

  artistItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#ffffff22",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },

  artistImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },

  artistName: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Perfil;
