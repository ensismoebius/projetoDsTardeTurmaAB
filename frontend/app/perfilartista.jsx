import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import * as Font from "expo-font";

const { width, height } = Dimensions.get("window");


const RF = (size) => {
  const scale = width / 390; 
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const songs = [
  { id: 1, title: "Musica 1" },
  { id: 2, title: "Musica 2" },
  { id: 3, title: "Musica 3" },
  { id: 4, title: "Musica 4" },
  { id: 5, title: "Musica 5" },
  { id: 6, title: "Musica 6" },
  { id: 7, title: "Musica 7" },
];

export default function ArtistProfile() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
  }, []);

  if (!fontsLoaded) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Carregando fontes...</Text>
        </View>
      );
    }
  return (
    <LinearGradient
      colors={["#8A00D4", "#E60073", "#FF7A00"]}
      style={{ flex: 1 }}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={{ paddingBottom: RF(40) }}
      >
       
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={RF(28)} color="#fff" />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { fontSize: RF(18) }]}>
            Perfil do Artista
          </Text>
        </View>

       
        <View style={[styles.artistImageContainer, { height: width * 0.7 }]}>
          <Image
            source={{
              uri: "https://i.pinimg.com/736x/69/21/f4/6921f48eda828ef63e8ee4d5844e40a5.jpg",
            }}
            style={styles.artistImage}
            resizeMode="cover"
          />
          <Text style={[styles.artistName, { fontSize: RF(26) }]}>
            Nome-Artista
          </Text>
        </View>

     
        <View style={styles.actionSection}>
          <View style={styles.leftActions}>
            <TouchableOpacity style={[styles.followButton, { paddingHorizontal: RF(18), paddingVertical: RF(8) }]}>
              <Text style={[styles.followText, { fontSize: RF(14) }]}>Seguir</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.circleIcon, { width: RF(40), height: RF(40), borderRadius: RF(20) }]}>
              <Ionicons name="ellipsis-vertical" size={RF(18)} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.rightActions}>
            <TouchableOpacity style={[styles.circleIcon, { width: RF(40), height: RF(40), borderRadius: RF(20) }]}>
              <Ionicons name="shuffle" size={RF(22)} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.playButton, { width: RF(52), height: RF(52), borderRadius: RF(26) }]}>
              <Ionicons name="play" size={RF(28)} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

       
        <View style={{ paddingHorizontal: RF(20), marginTop: RF(20) }}>
          <LinearGradient
            colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0.05)"]}
            style={[styles.popularCard, { padding: RF(18), borderRadius: RF(16) }]}
          >
            <Text style={[styles.popularTitle, { fontSize: RF(20) }]}>Popular</Text>

            <View style={{ gap: RF(12) }}>
              {songs.map((song) => (
                <TouchableOpacity
                  key={song.id}
                  style={[styles.songItem, { gap: RF(12) }]}
                >
                  <View style={[styles.songThumbnail, { width: RF(48), height: RF(48), borderRadius: RF(8) }]} />
                  <Text style={[styles.songTitle, { fontSize: RF(16) }]}>{song.title}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={[styles.discographyButton, { paddingHorizontal: RF(20), paddingVertical: RF(10), borderRadius: RF(20), marginTop: RF(20) }]}>
              <Text style={[styles.discographyText, { fontSize: RF(14) }]}>Ver discografia</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: RF(20),
    paddingHorizontal: RF(16),
    flexDirection: "row",
    alignItems: "center",
    gap: RF(12),
  },
  backButton: {
    width: RF(40),
    height: RF(40),
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: RF(20),
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontFamily: "negrito",
  },

  artistImageContainer: {
    width: width,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
  },
  artistImage: {
    width: "100%",
    height: "100%",
  },
  artistName: {
    position: "absolute",
    bottom: RF(12),
    left: RF(16),
    fontFamily: "negrito",
    color: "#fff",
    textShadowColor: "#000",
    textShadowRadius: 6,
  },

  actionSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: RF(20),
    marginTop: RF(10),
    alignItems: "center",
  },
  leftActions: { flexDirection: "row", alignItems: "center", gap: RF(10) },
  followButton: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  followText: { color: "#fff", fontFamily: "negrito" },
  circleIcon: {
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  rightActions: { flexDirection: "row", alignItems: "center", gap: RF(12) },
  playButton: { backgroundColor: "#fbbf24", justifyContent: "center", alignItems: "center" },

  popularCard: {
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  popularTitle: { color: "#fff", fontFamily:"negrito", marginBottom: RF(12) },

  songItem: { flexDirection: "row", alignItems: "center" },
  songThumbnail: { backgroundColor: "rgba(255,255,255,0.25)" },
  songTitle: { color: "#fff", fontFamily: "negrito" },

  discographyButton: { alignSelf: "center", backgroundColor: "rgba(255,255,255,0.3)" },
  discographyText: { color: "#fff", fontFamily: "negrito" },
});
