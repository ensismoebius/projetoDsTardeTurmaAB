import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const useReducedMotion = () => {
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
    }
  }, []);
  return reduceMotion;
};

const App = ({ navigation = { goBack: () => {} } }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const particles = Array.from({ length: 3 }, () => useRef(new Animated.Value(0)).current);

  const { width, height } = useWindowDimensions();
  const reduceMotion = useReducedMotion();
  const [showParticles, setShowParticles] = useState(false);

  const isPortrait = height >= width;

 
  const sizes = {
    header: Math.min(Math.max(width * 0.065, 18), 28),
    mainHeart: Math.min(Math.max(width * 0.23, 80), 140),
    particle: Math.min(Math.max(width * 0.045, 14), 22),
    title: Math.min(Math.max(width * 0.054, 18), 26),
    description: Math.min(Math.max(width * 0.04, 13), 18),
    nav: Math.min(Math.max(width * 0.038, 14), 20),
  };

  const handlePress = () => {
    if (reduceMotion) return;

    Animated.parallel([
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.25,
          duration: 160,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
        }),
      ]),
      Animated.stagger(
        120,
        particles.map((p) =>
          Animated.timing(p, {
            toValue: 1,
            duration: 650,
            useNativeDriver: true,
          })
        )
      ),
    ]).start(() => {
      particles.forEach((p) => p.setValue(0));
      setShowParticles(false);
    });

    setShowParticles(true);
  };

  const renderParticles = () =>
    !reduceMotion &&
    showParticles &&
    particles.map((anim, i) => {
      const translateY = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -100 - i * 18],
      });

      const translateX = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, (i % 2 === 0 ? -1 : 1) * (35 + i * 10)],
      });

      const opacity = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      });

      const colors = ["#ff007f", "#ffa200", "#ffee00"];

      return (
        <Animated.View
          key={i}
          style={{
            position: "absolute",
            top: height * 0.42,
            transform: [{ translateX }, { translateY }],
            opacity,
          }}
        >
          <FontAwesome name="heart" size={sizes.particle} color={colors[i]} />
        </Animated.View>
      );
    });

  return (
    <LinearGradient
      colors={["#962fbf", "#d62976", "#fa7e1e", "#feda75"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
      
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            accessibilityLabel="Voltar"
          >
            <AntDesign name="arrowleft" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={[styles.headerText, { fontSize: sizes.header }]}>
            Suas Curtidas
          </Text>
        </View>

      
        <View
          style={[
            styles.centerArea,
            { flexDirection: isPortrait ? "column" : "row" },
          ]}
        >
          <Pressable
            onPress={handlePress}
            accessibilityRole="button"
            disabled={reduceMotion}
          >
            <Animated.View
              style={[
                styles.heartButton,
                {
                  transform: [{ scale: scaleAnim }],
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 8,
                },
              ]}
            >
              <FontAwesome
                name="heart"
                size={sizes.mainHeart}
                color="#fff5"
                style={styles.backHeart}
              />
              <FontAwesome
                name="heart"
                size={sizes.mainHeart * 0.92}
                color="#ffda00"
              />
            </Animated.View>
          </Pressable>

          {renderParticles()}
        </View>

       
        <View style={styles.textArea}>
          <Text style={[styles.title, { fontSize: sizes.title }]}>
            Ainda sem curtidas
          </Text>

          <Text style={[styles.description, { fontSize: sizes.description }]}>
            Explore músicas e toque no coração para curtir!
          </Text>
        </View>

        <View style={styles.nav}>
          {["Player", "Curtidas", "Perfil"].map((item) => (
            <TouchableOpacity key={item} style={styles.navItem}>
              <Text style={[styles.navText, { fontSize: sizes.nav }]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },


  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 4,
    justifyContent: "center",
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    left: 16,
    backgroundColor: "rgba(255,255,255,0.18)",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },

 
  centerArea: {
    flex: 1.6,
    justifyContent: "center",
    alignItems: "center",
  },
  heartButton: {
    padding: 14,
    borderRadius: 100,
  },
  backHeart: {
    position: "absolute",
    top: 6,
    left: 6,
  },


  textArea: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },
  title: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  description: {
    color: "#fff",
    marginTop: 10,
    opacity: 0.85,
    textAlign: "center",
  },

 
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#000000bb",
    paddingVertical: 16,
  },
  navItem: {
    paddingHorizontal: 10,
  },
  navText: {
    color: "#ff3cf5",
    fontWeight: "500",
  },
});

export default App;
