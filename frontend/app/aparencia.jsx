import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Animated, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from "expo-router";
import * as Font from "expo-font";

const { width, height } = Dimensions.get("window");
const RF = (size) => size * (width / 390); 

export default function HomeScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const voltar = () => router.push('/Configuracoes');

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
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#8000d5", "#f910a3", "#fdff00"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, alignItems: 'center' }}
      >
       
        <TouchableOpacity style={styles.backCircle} onPress={voltar} activeOpacity={0.8}>
          <AntDesign name="arrowleft" size={RF(20)} color="#fff" />
        </TouchableOpacity>

        
        <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', width: '100%', marginTop: RF(50) }}>
          <Image
            style={[styles.Logo, { width: RF(140), height: RF(140) }]}
            source={require('../assets/images/Logofundo.png')}
            accessibilityLabel="Logo do aplicativo"
          />
        </Animated.View>

       
        <View style={styles.content}>
          <Text style={[styles.titulo, { fontSize: RF(24) }]}>Aparência</Text>
          <Text style={[styles.subtitulo, { fontSize: RF(18) }]}>Cor do perfil</Text>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#FDDF00' }]} />
            <TouchableOpacity style={[styles.button, { backgroundColor: '#F910A3' }]} />
            <TouchableOpacity style={[styles.button, { backgroundColor: '#8000D5' }]} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backCircle: {
    width: RF(42),
    height: RF(42),
    borderRadius: RF(21),
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: RF(20),
    left: RF(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  Logo: {
    resizeMode: 'contain',
    marginBottom: RF(20),
    borderRadius: RF(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  content: {
    alignItems: 'center',
    marginTop: RF(30),
  },
  titulo: {
    fontFamily: 'negrito',
    color: '#fff',
    marginBottom: RF(10),
  },
  subtitulo: {
    fontFamily: 'normal',
    color: '#fff',
    marginBottom: RF(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: RF(10),
  },
  button: {
    width: RF(63),
    height: RF(63),
    borderRadius: RF(15),
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
