import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useEffect } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Share,
  Pressable,
} from "react-native";

const { height, width } = Dimensions.get("window");

const DATA = [
  {
    id: "1",
    music: "Nome da Música",
    artist: "Nome do Artista",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    lyrics:
      "Letra da música...\nLorem ipsum dolor sit amet...\nMais verso...",
    image: "https://i.imgur.com/Nc3uQ2W.png",
    artistImage: "https://i.pravatar.cc/100",
  },
  {
    id: "2",
    music: "Outra Música",
    artist: "Outro Artista",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation...",
    lyrics:
      "Outra letra...\nMais versos...",
    image: "https://i.imgur.com/Nc3uQ2W.png",
    artistImage: "https://i.pravatar.cc/101",
  },
];

export default function SwipeMusic() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);
  const hideButtonTimer = useRef(null);

  const [showLyrics, setShowLyrics] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [liked, setLiked] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const startProgress = () => {
    animationRef.current = Animated.timing(progress, {
      toValue: 1,
      duration: (1 - progress._value) * 120000, 
      useNativeDriver: false,
    });
    animationRef.current.start(({ finished }) => {
      if (finished) {
        setIsPlaying(false);
        progress.setValue(0);
      }
    });
  };

  const togglePlay = () => {
    if (isPlaying) {
      animationRef.current?.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      startProgress();
    }

    
    setShowPlayButton(true);
    hideButtonTimer.current && clearTimeout(hideButtonTimer.current);
    hideButtonTimer.current = setTimeout(() => {
      setShowPlayButton(false);
    }, 3000);
  };

  const shareMusic = async (music) => {
    await Share.share({
      message: `Estou ouvindo: ${music.music} - ${music.artist}`,
    });
  };

  const addHeart = () => {
    const id = Math.random().toString();
    const newHeart = {
      id,
      animation: new Animated.Value(0),
    };
    setHearts((prev) => [...prev, newHeart]);

    Animated.timing(newHeart.animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    });
  };

  const handlePressIn = () => {
    setShowPlayButton(true);
    hideButtonTimer.current && clearTimeout(hideButtonTimer.current);
  };

  const handlePressOut = () => {
    if (isPlaying) {
      hideButtonTimer.current = setTimeout(() => {
        setShowPlayButton(false);
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate={0.98}
        snapToInterval={height}
        snapToAlignment="start"
        removeClippedSubviews={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={{ flex: 1, width: "100%", alignItems: "center" }}
            >
              <Image source={{ uri: item.image }} style={styles.background} />

              <LinearGradient
                colors={["#8000d5", "#f910a3", "#fddf00"]}
                style={styles.gradient}
              >
                <View style={styles.playFrame} />

                {showPlayButton && (
                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={togglePlay}
                  >
                    <LinearGradient
                      colors={["#fddf00", "#f910a3"]}
                      style={styles.playCircle}
                    >
                      <Ionicons
                        name={isPlaying ? "pause" : "play"}
                        size={50}
                        color="#fff"
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={() => {
                    setLiked(!liked);
                    addHeart();
                  }}
                  style={styles.likeButton}
                >
                  <Ionicons
                    name={liked ? "heart" : "heart-outline"}
                    size={40}
                    color={liked ? "#ff0049" : "#fff"}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => shareMusic(item)}
                  style={styles.shareButton}
                >
                  <Ionicons name="share-social" size={35} color="#fff" />
                </TouchableOpacity>

                {hearts.map((heart) => {
                  const scale = heart.animation.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 1.2, 0],
                  });
                  const opacity = heart.animation.interpolate({
                    inputRange: [0, 0.7, 1],
                    outputRange: [1, 1, 0],
                  });
                  const translateY = heart.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -80],
                  });

                  return (
                    <Animated.View
                      key={heart.id}
                      style={{
                        position: "absolute",
                        top: height * 0.638,
                        right: 320,
                        transform: [{ scale }, { translateY }],
                        opacity,
                      }}
                    >
                      <Ionicons name="heart" size={25} color="#ff0049" />
                    </Animated.View>
                  );
                })}

                <View style={styles.progressContainer}>
                  <Animated.View
                    style={[styles.progressFill, { width: progressWidth }]}
                  />
                </View>

                <LinearGradient
                  colors={["#8000d5", "#f910a3"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.musicBanner}
                >
                  <Text style={styles.musicTitle}>{item.music}</Text>
                </LinearGradient>

                <LinearGradient
                  colors={["#ff00cc", "#ffcc00"]}
                  style={styles.artistCard}
                >
                  <View style={styles.artistRow}>
                    <Image
                      source={{ uri: item.artistImage }}
                      style={styles.artistImage}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.artistName}>{item.artist}</Text>
                      <Text style={styles.artistDesc}>{item.description}</Text>
                    </View>
                  </View>
                </LinearGradient>

                <TouchableOpacity
                  onPress={() => {
                    setSelectedItem(item);
                    setShowLyrics(true);
                  }}
                >
                  <Text style={styles.lyricsText}>Ver Letra ↑</Text>
                </TouchableOpacity>
              </LinearGradient>
            </Pressable>
          </View>
        )}
      />

      <Modal visible={showLyrics} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Letra</Text>

            <Text style={styles.modalLyrics}>
              {selectedItem?.lyrics || "Sem letra disponível."}
            </Text>

            <TouchableOpacity
              onPress={() => setShowLyrics(false)}
              style={styles.modalClose}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  card: { width, height, alignItems: "center", justifyContent: "center" },
  background: { ...StyleSheet.absoluteFillObject },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 60,
  },

  playFrame: {
    position: "absolute",
    top: 40,
    width: "90%",
    height: height * 0.53,
    borderRadius: 30,
    backgroundColor: "#000",
    borderWidth: 4,
    borderColor: "#000",
    zIndex: -1,
    alignSelf: "center",
  },
  playButton: { position: "absolute", top: height * 0.25 },
  playCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  likeButton: { position: "absolute", top: height * 0.638, right: 320 },
  shareButton: { position: "absolute", top: height * 0.640, right: 25 },

  progressContainer: {
    position: "absolute",
    top: height * 0.60,
    right: 25,
    width: 330,
    height: 6,
    backgroundColor: "#ffffff40",
    borderRadius: 10,
  },
  progressFill: {
    height: 6,
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  musicBanner: {
    width: "110%",
    top: height * 0.45,
    height: height * 0.50,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#55004cff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
    overflow: "hidden",
  },
  musicTitle: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
    position: "absolute",
    top: 10,
    textAlign: "center",
    width: "100%",
  },

  artistCard: { width: "87%", borderRadius: 20, padding: 12 },
  artistRow: { flexDirection: "row", alignItems: "center" },
  artistImage: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  artistName: { fontSize: 16, fontWeight: "bold", color: "#fff", marginBottom: 5 },
  artistDesc: { color: "#fff", fontSize: 12 },

  lyricsText: { marginTop: 20, fontSize: 14, color: "#fff", opacity: 0.8 },

  modalContainer: { flex: 1, backgroundColor: "#000a", justifyContent: "flex-end" },
  modalBox: { backgroundColor: "#222", padding: 20, borderTopLeftRadius: 25, borderTopRightRadius: 25, maxHeight: height * 0.7 },
  modalTitle: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  modalLyrics: { color: "#ddd", fontSize: 16, marginBottom: 20 },
  modalClose: { backgroundColor: "#f910a3", padding: 12, alignItems: "center", borderRadius: 10 },
});
