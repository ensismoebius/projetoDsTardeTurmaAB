import React, { useEffect ,useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
  Easing,
  Dimensions,
  PixelRatio,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import * as Font from "expo-font";

const { width } = Dimensions.get("window");
const RF = (size) => Math.round(PixelRatio.roundToNearestPixel(size * (width / 390)));

export default function PrivacidadeScreen() {
  const [visOpen, setVisOpen] = useState(false);
  const [contaOpen, setContaOpen] = useState(false);
  const [mensagensOn, setMensagensOn] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const visAnim = useRef(new Animated.Value(0)).current;
  const contaAnim = useRef(new Animated.Value(0)).current;

  const toggleVis = () => {
    const toValue = visOpen ? 0 : 1;
    setVisOpen(!visOpen);
    Animated.timing(visAnim, {
      toValue,
      duration: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

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


  const toggleConta = () => {
    const toValue = contaOpen ? 0 : 1;
    setContaOpen(!contaOpen);
    Animated.timing(contaAnim, {
      toValue,
      duration: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  const visHeight = visAnim.interpolate({ inputRange: [0, 1], outputRange: [0, RF(90)] });
  const visRotate = visAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });

  const contaHeight = contaAnim.interpolate({ inputRange: [0, 1], outputRange: [0, RF(70)] });
  const contaRotate = contaAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });

  const toggleMensagens = () => setMensagensOn((v) => !v);

  return (
    <LinearGradient
      colors={["#7B1FA2", "#E1306C", "#FF6F61", "#F9A825"]}
      start={[0, 0]}
      end={[0, 1]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
     
        <TouchableOpacity style={[styles.backCircle, { width: RF(40), height: RF(40), borderRadius: RF(20), marginTop: RF(12) }]}>
          <AntDesign name="arrowleft" size={RF(20)} color="#fff" />
        </TouchableOpacity>

        
        <View style={styles.logoWrap}>
          <Image
            source={require("../assets/images/Logofundo.png")}
            style={{ width: RF(140), height: RF(140) }}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.title, { fontSize: RF(20), marginTop: RF(12), marginBottom: RF(22) }]}>Privacidade</Text>

        <View style={styles.options}>
  
          <TouchableOpacity style={[styles.optionRow, { paddingVertical: RF(12), paddingHorizontal: RF(18), borderRadius: RF(28) }]} activeOpacity={0.85} onPress={toggleVis}>
            <Text style={[styles.optionText, { fontSize: RF(16) }]}>Visibilidade</Text>
            <View style={[styles.chevronCircle, { width: RF(36), height: RF(36), borderRadius: RF(18) }]}>
              <Animated.View style={{ transform: [{ rotate: visRotate }] }}>
                <AntDesign name="down" size={RF(14)} color="#E1306C" />
              </Animated.View>
            </View>
          </TouchableOpacity>

          <Animated.View style={[styles.expandArea, { height: visHeight }]}>
            <View style={{ paddingHorizontal: RF(22), paddingTop: RF(12) }}>
              <Text style={[styles.expandText, { fontSize: RF(14), paddingVertical: RF(6) }]}>Público</Text>
              <Text style={[styles.expandText, { fontSize: RF(14), paddingVertical: RF(6) }]}>Amigos</Text>
              <Text style={[styles.expandText, { fontSize: RF(14), paddingVertical: RF(6) }]}>Apenas eu</Text>
            </View>
          </Animated.View>

         
          <TouchableOpacity style={[styles.optionRow, { paddingVertical: RF(12), paddingHorizontal: RF(18), borderRadius: RF(28) }]} activeOpacity={0.85} onPress={toggleConta}>
            <Text style={[styles.optionText, { fontSize: RF(16) }]}>Conta Privada</Text>
            <View style={[styles.chevronCircle, { width: RF(36), height: RF(36), borderRadius: RF(18) }]}>
              <Animated.View style={{ transform: [{ rotate: contaRotate }] }}>
                <AntDesign name="down" size={RF(14)} color="#E1306C" />
              </Animated.View>
            </View>
          </TouchableOpacity>

          <Animated.View style={[styles.expandArea, { height: contaHeight }]}>
            <View style={{ paddingHorizontal: RF(22), paddingTop: RF(12) }}>
              <Text style={[styles.expandText, { fontSize: RF(14) }]}>
                Ao ativar, somente aprovados verão seu conteúdo
              </Text>
            </View>
          </Animated.View>

         
          <View style={[styles.optionRow, { paddingVertical: RF(12), paddingHorizontal: RF(18), borderRadius: RF(28) }]}>
            <Text style={[styles.optionText, { fontSize: RF(16) }]}>Mensagens diretas</Text>
            <TouchableOpacity onPress={toggleMensagens} activeOpacity={0.8}>
              <View style={[styles.switchTrack, mensagensOn && styles.switchTrackOn, { width: RF(56), height: RF(30), borderRadius: RF(30), padding: RF(3) }]}>
                <Animated.View style={[styles.switchThumb, mensagensOn && styles.switchThumbOn, { width: RF(22), height: RF(22), borderRadius: RF(11) }]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, paddingHorizontal: 22 },
  backCircle: {
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -2,
  },
  logoWrap: { alignItems: "center", marginTop: 20 },
  title: { color: "#fff", fontFamily:"negrito", textAlign: "center" },
  options: { marginTop: 6 },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "rgba(255,255,255,0.9)",
    borderWidth: 2,
    backgroundColor: "transparent",
    marginVertical: 8,
  },
  optionText: { 
    color: "#fff",
    fontFamily:"negrito", 
  },
  chevronCircle: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  expandArea: { overflow: "hidden", marginHorizontal: 0 },
  expandText: { color: "rgba(255,255,255,0.95)", fontFamily:"normal" },
  switchTrack: {
    backgroundColor: "rgba(255,255,255,0.22)",
    justifyContent: "center",
  },
  switchTrackOn: { backgroundColor: "rgba(255,255,255,0.9)" },
  switchThumb: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  switchThumbOn: { alignSelf: "flex-end", backgroundColor: "#E1306C" },
});
