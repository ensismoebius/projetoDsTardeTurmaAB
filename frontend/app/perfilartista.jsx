import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

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
  return (
    <LinearGradient
      colors={["#8A00D4", "#E60073", "#FF7A00"]}
      style={{ flex: 1 }}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Perfil do Artista</Text>
        </View>

        {/* IMAGEM DO ARTISTA */}
        <View style={styles.artistImageContainer}>
          <Image
            source={{
              uri: "https://i.pinimg.com/736x/69/21/f4/6921f48eda828ef63e8ee4d5844e40a5.jpg",
            }}
            style={styles.artistImage}
          />
          <Text style={styles.artistName}>Nome-Artista</Text>
        </View>

        <View style={styles.actionSection}>
          <View style={styles.leftActions}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>Seguir</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.circleIcon}>
              <Ionicons name="ellipsis-vertical" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.rightActions}>
            <TouchableOpacity style={styles.circleIcon}>
              <Ionicons name="shuffle" size={22} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play" size={28} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.popularWrapper}>
          <LinearGradient
            colors={["rgba(255,255,255,0.2)"]}
            style={styles.popularCard}
          >
            <Text style={styles.popularTitle}>Popular</Text>

            <View style={styles.songList}>
              {songs.map((song) => (
                <TouchableOpacity key={song.id} style={styles.songItem}>
                  <View style={styles.songThumbnail} />
                  <Text style={styles.songTitle}>{song.title}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.discographyButton}>
              <Text style={styles.discographyText}>Ver discografia</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  artistImageContainer: {
    width: width,
    height: 260,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  artistImage: {
    width: "100%",
    height: "100%",
  },
  artistName: {
    position: "absolute",
    bottom: 12,
    left: 16,
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "#000",
    textShadowRadius: 6,
  },

  actionSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
  },
  leftActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  followButton: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  followText: {
    color: "#fff",
    fontWeight: "600",
  },
  circleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  playButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#fbbf24",
    justifyContent: "center",
    alignItems: "center",
  },

  popularWrapper: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  popularCard: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    padding: 18,
  },
  popularTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  songList: {
    gap: 12,
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  songThumbnail: {
    width: 48,
    height: 48,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  songTitle: {
    color: "#fff",
    fontSize: 16,
  },

  discographyButton: {
    marginTop: 20,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  discographyText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
