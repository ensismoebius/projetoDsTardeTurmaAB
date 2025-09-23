import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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

const formatPhone = (value) => {
    if (!value) return "";
    const cleaned = value.replace(/[^0-9]/g, "").slice(0, 11);  
if (cleaned.length <= 2) {
      return `(${cleaned}`;
    } else if (cleaned.length <= 7) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
  };  const handleChange = (text) => {
    // Sempre salva apenas os números
    const numericValue = text.replace(/[^0-9]/g, "").slice(0, 11);
    setWhatsapp(numericValue);
  };
  function Inicio() {
    roteador.push('/');
  }

  const roteador = useRouter();

  return (
    <LinearGradient
      colors={['#8000d5','#f910a3', '#fddf00']}
      
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
        value={formatPhone(whatsapp)} // Mostra formatado
        onChangeText={handleChange}   // Guarda só números
        keyboardType="phone-pad"
      />
      <Text style={styles.debug}>📦 Salvo no estado: {whatsapp}</Text>

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
