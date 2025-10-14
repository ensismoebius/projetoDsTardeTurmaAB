import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';

const Cadastro = () => {
  const { width, height } = useWindowDimensions();

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
  const rf = (size) => Math.round(clamp(size * (width / 390), 12, 28)); // escala responsiva

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = () => {
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Senha:', senha);
  };

  return (
    <LinearGradient colors={['#8000d5', '#f910a3', '#fddf00']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* Logo */}
        <View style={[styles.logoContainer, { marginTop: rf(-50), marginBottom: rf(30) }]}>
          <Image style={[styles.Logo, { width: rf(130), height: rf(130) }]} source={require('../assets/images/Logofundo.png')} />
        </View>

        {/* Form Container */}
        <View style={[styles.formContainer, { paddingHorizontal: rf(20) }]}>
          <Text style={[styles.titulo, { fontSize: rf(28), marginBottom: rf(20) }]}>Cadastro</Text>

          <TextInput
            style={[styles.input, { width: width * 0.9, height: rf(50), fontSize: rf(18), paddingHorizontal: rf(15) }]}
            placeholder="Nome de usuário"
            placeholderTextColor="#FFF"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={[styles.input, { width: width * 0.9, height: rf(50), fontSize: rf(18), paddingHorizontal: rf(15) }]}
            placeholder="Email"
            placeholderTextColor="#FFF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TextInput
            style={[styles.input, { width: width * 0.9, height: rf(50), fontSize: rf(18), paddingHorizontal: rf(15) }]}
            placeholder="Senha"
            placeholderTextColor="#FFF"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.botao, { width: width * 0.9, paddingVertical: rf(12), borderRadius: rf(50), marginTop: rf(25) }]}
            onPress={handleCadastro}
          >
            <Text style={[styles.textoBotao, { fontSize: rf(20) }]}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignSelf: 'center',
  },
  Logo: {
    resizeMode: 'contain',
  },
  formContainer: {
    width: '100%',
    maxWidth: 450, // limite para tablets e telas grandes
  },
  titulo: {
    fontFamily: 'negrito',
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'normal',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  botao: {
    backgroundColor: '#1d1436',
    borderWidth: 1,
    borderColor: '#8000D5',
    alignItems: 'center',
    marginBottom: rf(20),
  },
  textoBotao: {
    color: '#FFF',
    fontFamily: 'negrito',
  },
});

export default Cadastro;
