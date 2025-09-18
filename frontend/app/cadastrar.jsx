import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handleCadastro = () => {
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Senha:', senha);
    console.log('WhatsApp:', whatsapp);
  };

  function Inicio() {
    roteador.push('/');
  }

  const roteador = useRouter();

  return (
    <LinearGradient
      colors={['#fedea6','#fc7ea7', '#7466e6']}
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 1 }} 
      style={styles.container}
    >
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.formContainer}>
        <Text style={styles.titulo}>Cadastro</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#aaa"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#aaa"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <Text style={styles.label}>WhatsApp</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu número"
          placeholderTextColor="#aaa"
          value={whatsapp}
          onChangeText={setWhatsapp}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={Inicio}>
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>

      </View>
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
    color: '#ffffff',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: 'normal',
    color: '#fffdfd',
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
    borderColor: '#ffe8e8',
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
    backgroundColor: '#ffe02e',
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
