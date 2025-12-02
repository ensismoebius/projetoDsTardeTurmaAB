import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState, memo } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height, width } = Dimensions.get("window");

const DATA = [
  {
    id: "1",
    music: "Nome da Música",
    artist: "Nome do Artista",
    description: "Lorem ipsum dolor sit amet...",
    lyrics: "Letra...\nMais versos...",
    image: "https://i.imgur.com/Nc3uQ2W.png",
    artistImage: "https://i.pravatar.cc/100",
  },
  {
    id: "2",
    music: "Outra Música",
    artist: "Outro Artista",
    description: "Ut enim ad minim veniam...",
    lyrics: "Outra letra...",
    image: "https://i.imgur.com/Nc3uQ2W.png",
    artistImage: "https://i.pravatar.cc/101",
  },
];



const HeartAnimation = memo(({ anim, id }) => {
  const scale = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1.2, 0],
  });

  const opacity = anim.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [1, 1, 0],
  });

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -80],
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: height * 0.64,
        right: 300,
        transform: [{ scale }, { translateY }],
        opacity,
      }}
    >
      <Ionicons name="heart" size={25} color="#ff0049" />
    </Animated.View>
  );
});


const PlayButton = memo(({ isPlaying, onPress }) => (
  <TouchableOpacity style={styles.playButton} onPress={onPress}>
    <LinearGradient colors={["#fddf00", "#f910a3"]} style={styles.playCircle}>
      <Ionicons name={isPlaying ? "pause" : "play"} size={50} color="#fff" />
    </LinearGradient>
  </TouchableOpacity>
));



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


  useEffect(() => {
    Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const startProgress = () => {
    const current = progress.__getValue();

    animationRef.current = Animated.timing(progress, {
      toValue: 1,
      duration: (1 - current) * 120000,
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

    showControls();
  };

  const showControls = () => {
    setShowPlayButton(true);
    clearTimeout(hideButtonTimer.current);

    hideButtonTimer.current = setTimeout(() => {
      if (isPlaying) setShowPlayButton(false);
    }, 3000);
  };

  const addHeart = () => {
    const id = Math.random().toString();
    const anim = new Animated.Value(0);

    setHearts((prev) => [...prev, { id, anim }]);

    Animated.timing(anim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    });
  };

  const shareMusic = async (item) => {
    await Share.share({
      message: `Estou ouvindo: ${item.music} - ${item.artist}`,
    });
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });


  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Pressable style={{ flex: 1 }} onPress={showControls}>
              <Image source={{ uri: item.image }} style={styles.background} />

              <LinearGradient
                colors={["#8000d5", "#f910a3", "#fddf00"]}
                style={styles.gradient}
              >
                <View style={styles.playFrame} />

                {showPlayButton && (
                  <PlayButton isPlaying={isPlaying} onPress={togglePlay} />
                )}

                
                <View style={styles.progressContainer}>
                  <Animated.View
                    style={[styles.progressFill, { width: progressWidth }]}
                  />
                </View>

             
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

                
                {hearts.map((h) => (
                  <HeartAnimation key={h.id} anim={h.anim} />
                ))}

            
                <LinearGradient
                  colors={["#8000d5", "#f910a3"]}
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
                    <View>
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
  card: { width, height },
  background: { ...StyleSheet.absoluteFillObject },

  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
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
  },

  playButton: { position: "absolute", top: height * 0.25 },
  playCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  likeButton: { position: "absolute", top: height * 0.64, right: 300 },
  shareButton: { position: "absolute", top: height * 0.64, right: 25 },

  progressContainer: {
    position: "absolute",
    top: height * 0.60,
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
    height: height * 0.5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#55004cff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
  },

  musicTitle: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
    position: "absolute",
    top: 10,
  },

  artistCard: {
    width: "87%",
    borderRadius: 20,
    padding: 12,
    marginTop: 20,
  },
  artistRow: { flexDirection: "row", alignItems: "center" },
  artistImage: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },

  artistName: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  artistDesc: { color: "#fff", fontSize: 12 },

  lyricsText: {
    marginTop: 18,
    fontSize: 14,
    color: "#fff",
    opacity: 0.8,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "#0008",
    justifyContent: "flex-end",
  },
  modalBox: {
    backgroundColor: "#222",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: height * 0.7,
  },
  modalTitle: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  modalLyrics: { color: "#ddd", fontSize: 16, marginVertical: 20 },

  modalClose: {
    backgroundColor: "#f910a3",
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
  },
});
