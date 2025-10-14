import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const App = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [showParticles, setShowParticles] = useState(false);

  const particles = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setShowParticles(true);
    particles.forEach((particle, index) => {
      particle.setValue(0);
      Animated.timing(particle, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }).start(() => {
        if (index === particles.length - 1) {
          setShowParticles(false);
        }
      });
    });
  };

  return (
   
    <LinearGradient
    colors={['#962fbf', '#d62976', '#fa7e1e', '#feda75', '#4f5bd5']} 
    style={styles.container}
    start={{ x: 0.5, y: 0 }}    // topo centralizado (x = 0.5, y = 0)
    end={{ x: 0.5, y: 1 }}     
  >
  

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Bem Vindo, "nome"!!</Text>
        </View>
        <View style={styles.fundoPost}>
        <View style={styles.postagem}>
        <Text style={styles.titulo}>Título da Postagem</Text>
        <Text style={styles.conteudo}>
          Este é o conteúdo da sua postagem. Você pode colocar texto, imagens ou qualquer outro componente aqui.
        </Text>
        </View>
        <View style={styles.postagem}>
        <Text style={styles.titulo}>Título da Postagem</Text>
        <Text style={styles.conteudo}>
          Este é o conteúdo da sua postagem. Você pode colocar texto, imagens ou qualquer outro componente aqui.
        </Text>
        </View>
        <View style={styles.postagem}>
        <Text style={styles.titulo}>Título da Postagem</Text>
        <Text style={styles.conteudo}>
          Este é o conteúdo da sua postagem. Você pode colocar texto, imagens ou qualquer outro componente aqui.
        </Text>
        </View>

      </View>

        <View style={styles.nav}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText1}>Notificação</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText1}>Player</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText1}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText1}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText1}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  fundoPost:{
    height: 400,
  },
  postagem: {
    backgroundColor: 'rgba(128, 128, 128, 0.45)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    padding: 16,
    width: '100%',
    maxWidth: 400,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // branco para contraste
    marginBottom: 8,
  },
  conteudo: {
    fontSize: 16,
    color: '#f0f0f0',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1d1436',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 2,
  },
  navItem: {
    padding: 10,
  },
  navText1: {
    fontSize: 16,
    color: '#ff3cf5',
  },
});

export default App;
