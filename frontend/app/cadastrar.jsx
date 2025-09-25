import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
  
  import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
  
  const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
  
  
    const handleCadastro = () => {
      console.log('Nome:', nome);
      console.log('Email:', email);
      console.log('Senha:', senha);
  
    };
  
    function Inicio() {
      roteador.push('/');
    }
  
  
  
    return (
      <LinearGradient
        colors={['#8000d5', '#f910a3', '#fddf00']}
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <View style={styles.formContainer}>
            <View style={styles.logoContainer}>

              <Image
              style={styles.Logo}
              source={require('../assets/images/Logofundo.png')}
              />
              </View>
  
              <Text style={styles.titulo}>Cadastro</Text>
  
  
              <TextInput
                style={styles.input}
                placeholder="Nome de usuário"
                placeholderTextColor="#FFF"
                value={nome}
                onChangeText={setNome}
              />
  
  
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#FFF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
  
  
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#FFF"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />
  
              <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
                <Text style={styles.textoBotao}>Login</Text>
              </TouchableOpacity>
  
          </View>
      </SafeAreaView>
      </LinearGradient >
  
      
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
      color: '#fff',
      textAlign: 'center',
    },
    input: {
      height: 45,
      width: '99%',
      borderRadius: 25,
      paddingHorizontal: 20,
      fontSize: 19,
      fontFamily: 'normal',
      borderWidth: 2,
      textAlign: 'center',
      borderColor: '#FFF',
      marginTop: 23,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 5,
      
    },
    botao: {
      backgroundColor: '#1d1436',
      paddingVertical: 8,
      borderWidth: 1,
      borderRadius: 50,
      borderColor: '#8000D5',
      alignItems: 'center',
      marginTop: 30,
      marginBottom: 20,
  
    },
    textoBotao: {
      color: '#FFF',
      fontSize: 20,
      fontFamily: 'negrito',
    },
    Logo: {
      width: 150,
      height: 150,
    },
    logoContainer: {
      width: 150,
      height: 150,
      alignSelf: 'center',
      marginBottom: 50,
      marginTop: -100,

    },
  });
  
  export default Cadastro;
  

