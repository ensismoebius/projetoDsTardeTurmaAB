import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";



export default function Index() {
  function cadastro() {
    roteador.push('/cadastrar');
  }
  function entrar() {
    roteador.push('/uploadMusic');
  }

  const roteador = useRouter();

  return (
    <LinearGradient
         colors={['#8000d5','#f910a3', '#fddf00']}
         
          style={styles.container}
        >
    <View style={styles.container}>


      <Text style={styles.title}>Login</Text>
    


      <View style={styles.form}>

        <View style={styles.inputBlock}>
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#FFF"
            keyboardType="email-address"
          />
        </View>


        <View style={styles.inputBlock}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            placeholderTextColor="#FFF"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={entrar}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={cadastro}>
        <Text style={styles.footer}>
          Não tem uma conta?{' '}
          <Text style={styles.footerLink}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',

  },
  inputBlock: {
    marginBottom: 20,
  },
 
  form: {
    marginTop: 150,
  },
  input: {
    height: 35,
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: "normal",
    borderWidth: 2,
    borderColor: "#FFF",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    textAlign: "center",
  },
  button: {
    backgroundColor: '#1d1436',
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#8000d5',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'negrito',
  },
  title: {
    fontSize: 26,
    fontFamily: 'negrito',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle:{
    fontSize:15,
    fontFamily: 'normal',
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    fontFamily: 'normal',
  },
  footerLink: {
    color: '#333',
    fontFamily: 'negrito',
    textDecorationLine: 'underline',
  },
});