import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const roteador = useRouter();

 const { width, height } = useWindowDimensions();
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
  const rf = (size) =>
    Math.round(clamp(size * (width / 375), Math.max(12, size * 0.85), size * 1.6));

  const containerPadding = Math.max(12, width * 0.06);
  const maxContentWidth = Math.min(width * 0.94, 720);

  const handleCadastro = () => {
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Senha:', senha);
    console.log('WhatsApp:', whatsapp);
  };

  function Inicio() {
    roteador.push('/');
  }



  return (
    <LinearGradient
      colors={['#8000d5','#f910a3', '#fddf00']}
      style={styles.container}
    >
    <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={[styles.formContainer,
      { paddingHorizontal: containerPadding, maxWidth: maxContentWidth }, ]}>
        <Text style={[styles.titulo, { fontSize: rf(26), marginBottom: clamp(height * 0.02, 8, 20) }]}>Cadastro</Text>

        <Text style={[styles.label, { fontSize: rf(14) }]}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#aaa"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, { height: clamp(height * 0.065, 48, 68), fontSize: rf(16) }]}
          placeholder="Digite seu email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={[styles.label, { fontSize: rf(14) }]}>Senha</Text>
        <TextInput
          style={[styles.input, { height: clamp(height * 0.065, 48, 68), fontSize: rf(16) }]}
          placeholder="Digite sua senha"
          placeholderTextColor="#aaa"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <Text style={[styles.label, { fontSize: rf(14) }]}>WhatsApp</Text>
        <TextInput
          style={[styles.input, { height: clamp(height * 0.065, 48, 68), fontSize: rf(16) }]}
          placeholder="Digite seu número"
          placeholderTextColor="#aaa"
          value={whatsapp}
          onChangeText={setWhatsapp}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={[styles.botao, { paddingVertical: clamp(height * 0.02, 12, 20) }]} onPress={handleCadastro}>
          <Text style={[styles.textoBotao, { fontSize: rf(16) }]}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, { paddingVertical: clamp(height * 0.02, 12, 20) }]} onPress={Inicio}>
          <Text style={[styles.textoBotao, { fontSize: rf(16) }]}>Voltar</Text>
        </TouchableOpacity>

      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 26,
    fontFamily: 'negrito',
    color: '#000',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: 'normal',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    paddingHorizontal: 14,
    fontSize: 16,
    fontFamily: 'normal',
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  botao: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'negrito',
  },
});

export default Cadastro;
