import { View,Text, TouchableOpacity, StyleSheet,KeyboardAvoidingView, Platform, Animated, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from "expo-router";
import * as Font from "expo-font";





export default function HomeScreen() {

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const roteador = useRouter();

  function voltar() {
    roteador.push('/Configuracoes');
  }

  const loadFonts = async () => {
    await Font.loadAsync({
      normal: require("../assets/fonts/Inter_18pt-Regular.ttf"),
      negrito: require("../assets/fonts/Inter_18pt-Bold.ttf"),
      fino: require("../assets/fonts/Inter_18pt-Thin.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    loadFonts();
  }, []);

  
  
  
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Carregando fontes...</Text>
      </View>
    );
  }
  return (
    <LinearGradient colors={["#8000d5", "#f910a3", "#fdff00"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableOpacity style={styles.backCircle} onPress={() => voltar()}>
                        <AntDesign name="arrowleft" size={20} color="#fff" />
                      </TouchableOpacity>
              <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', width: '100%' }}></Animated.View>

              <View style={[styles.logoContainer]}>
                  <Image
                    style={[styles.Logo]}
                    source={require('../assets/images/Logofundo.png')}
                    accessibilityLabel="Logo do aplicativo"
                  />
                </View>
    <View style={styles.container}>
      <View>
        <Text style={styles.titulo}>Aparência</Text>

        <Text style={styles.subtitulo}>Cor do perfil</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button1}>

        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button3}>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignSelf: 'center', 
    marginTop: 30,
  },
  Logo: { 
    resizeMode: 'contain',
    width: 150, 
    height: 150,
    marginBottom: 30, 
  },
  subtitulo:{
    fontSize: 20,
    marginBottom: 30,
    alignSelf: 'center',
    fontFamily: 'normal',
    color: '#fff',
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginLeft: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  titulo:{
    fontSize: 24,
    fontFamily: 'negrito',
    marginBottom: 20,
    alignSelf: 'center', 
    color: '#fff',
  },
  button1:{
    backgroundColor: '#FDDF00',
    padding: 10,
    margin: 20,
    borderRadius: 15,
    height: 63,
    width: 63,
    borderWidth: 2,
    borderColor: 'white',
  },
  button2:{
    backgroundColor: '#F910A3',
    padding: 10,
    margin: 20,
    borderRadius: 15,
    height: 63,
    width: 63,
    borderWidth: 2,
    borderColor: 'white',
  },
  button3:{
    backgroundColor: '#8000D5',
    padding: 10,
    margin: 20,
    borderRadius: 15,
    height: 63,
    width: 63,
    borderWidth: 2,
    borderColor: 'white',
  },
});