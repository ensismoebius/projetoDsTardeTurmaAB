import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useMemo } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Logofundo from "../assets/images/Logofundo.png";

const Configuracoes = React.memo(() => {
  const router = useRouter();
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pressScale = useRef(new Animated.Value(1)).current;

  const { width } = useWindowDimensions();

  
  const rf = (size) => Math.round(size * (width / 390));

  const dyn = useMemo(
    () => ({
      logoSize: rf(140),
      titleSize: rf(28),
      buttonFontSize: rf(18),
      buttonRadius: rf(25),
      buttonPadding: rf(15),
      backButtonSize: rf(42),
      backIconSize: rf(22),
    }),
    [width]
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 650,
      useNativeDriver: true,
    }).start();
  }, []);

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(pressScale, {
        toValue: 0.95,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.timing(pressScale, {
        toValue: 1,
        duration: 110,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const goTo = (path) => {
    animatePress();
    setTimeout(() => {
      router.push(`/${path}`);
    }, 120);
  };

  return (
    <LinearGradient
      colors={["#8000d5", "#f910a3", "#fddf00"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safe}>
        
        <TouchableOpacity
          style={[
            styles.voltar,
            {
              width: dyn.backButtonSize,
              height: dyn.backButtonSize,
              borderRadius: dyn.backButtonSize / 2,
            },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={dyn.backIconSize} color="#fff" />
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.container,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              },
            ]}
          >
           
            <View style={styles.logoContainer}>
              <Image
                style={[
                  styles.logo,
                  {
                    width: dyn.logoSize,
                    height: dyn.logoSize,
                  },
                ]}
                source={Logofundo}
                accessibilityLabel="Logo do aplicativo"
              />
            </View>

            
            <Text
              style={[
                styles.titulo,
                {
                  fontSize: dyn.titleSize,
                },
              ]}
            >
              Configurações
            </Text>

               <Animated.View
              style={[
                styles.botoesContainer,
                { transform: [{ scale: pressScale }] },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.botao,
                  {
                    borderRadius: dyn.buttonRadius,
                    paddingVertical: dyn.buttonPadding,
                  },
                ]}
                onPress={() => goTo("privacidade")}
              >
                <Text
                  style={[
                    styles.textoBotao,
                    { fontSize: dyn.buttonFontSize },
                  ]}
                >
                  Privacidade
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.botao,
                  {
                    borderRadius: dyn.buttonRadius,
                    paddingVertical: dyn.buttonPadding,
                  },
                ]}
                onPress={() => goTo("aparencia")}
              >
                <Text
                  style={[
                    styles.textoBotao,
                    { fontSize: dyn.buttonFontSize },
                  ]}
                >
                  Aparência
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
});

Configuracoes.displayName = "Configuracoes";

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },

  voltar: {
    position: "absolute",
    top: 55,
    left: 25,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.20)",
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },

  container: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },

  logo: {
    resizeMode: "contain",
  },

  titulo: {
    color: "#fff",
    fontFamily: "negrito",
    textAlign: "center",
    marginVertical: 25,
  },

  botoesContainer: {
    width: "75%",
    alignItems: "center",
    gap: 18,
  },

  botao: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderColor: "#fff",
    borderWidth: 2,
    alignItems: "center",
  },

  textoBotao: {
    color: "#fff",
    fontFamily: "negrito",
  },
});

export default Configuracoes;
