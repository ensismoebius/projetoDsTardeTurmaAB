import { View,Text, TouchableOpacity, StyleSheet,KeyboardAvoidingView, Platform, Animated, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';





export default function HomeScreen() {

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);
  
  const navigation = useMemo(() => {
    return {
      goBack: () => {
        console.log('Go back pressed');
      },
    };
  }, []);

  return (
    <LinearGradient colors={["#8000d5", "#f910a3", "#fdff00"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableOpacity style={styles.backCircle} onPress={() => navigation.goBack()}>
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
    alignSelf: 'center' 
  },
  Logo: { 
    resizeMode: 'contain',
    width: 200, 
    height: 200 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titulo:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button1:{
    backgroundColor: '#FDDF00',
    padding: 10,
    margin: 10,
    borderRadius: 15,
    height: 63,
    width: 63,
    borderWidth: 2,
    borderColor: 'white',
  },
  button2:{
    backgroundColor: '#F910A3',
    padding: 10,
    margin: 10,
    borderRadius: 15,
    height: 63,
    width: 63,
    borderWidth: 2,
    borderColor: 'white',
  },
  button3:{
    backgroundColor: '#8000D5',
    padding: 10,
    margin: 10,
    borderRadius: 15,
    height: 63,
    width: 63,
    borderWidth: 2,
    borderColor: 'white',
  },
});