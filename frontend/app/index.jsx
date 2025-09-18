import { Text, TouchableOpacity, TextInput, View, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';


export default function Index() {
  function cadastro() {
    roteador.push('/cadastrar');
  }

  const roteador = useRouter();

  return (
    <LinearGradient
          colors={['#fedea6','#fc7ea7', '#7466e6']}
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }} 
          style={styles.container}
        >
    <View style={styles.container}>


      <Text style={styles.title}>Descubra Musica Local</Text>
      <Text style={styles.subtitle}>Conecte-se com artistas sa sua região</Text>


      <View style={styles.form}>

        <View style={styles.inputBlock}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="email@exemplo.com"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
          />
        </View>


        <View style={styles.inputBlock}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry={true}
            placeholderTextColor="#aaa"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
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
  label: {
    fontSize: 14,
    fontFamily: 'normal',
    color: '#ffffff',
    marginBottom: 6,
  },
  form: {
    marginTop: 150,
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
    borderColor: '#fdd4d4',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: '#fff130',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
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
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle:{
    fontSize:15,
    fontFamily: 'normal',
    color: '#fff7f7',
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    fontSize: 14,
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'normal',
  },
  footerLink: {
    color: '#ffffff',
    fontFamily: 'negrito',
    textDecorationLine: 'underline',
  },
});