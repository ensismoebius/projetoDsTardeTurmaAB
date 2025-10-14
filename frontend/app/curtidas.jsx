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
    colors={['#962fbf', '#d62976', '#fa7e1e', '#feda75',]} 
    style={styles.container}
    start={{ x: 0.5, y: 0 }}    // topo centralizado (x = 0.5, y = 0)
    end={{ x: 0.5, y: 1 }}     
  >
  

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Suas Curtidas</Text>
        </View>

        <View style={styles.iconContainer}>
  <TouchableWithoutFeedback onPress={handlePress}>
    <Animated.View style={[styles.iconButton, { transform: [{ scale: scaleAnim }] }]}>
      {/* Coração branco maior atrás */}
      <Icon name="heart" size={96} color="#fff" style={{ position: 'absolute', top: 8, left: 7 }} />
      {/* Coração amarelo na frente */}
      <Icon name="heart" size={90} color="#ffd900" />
    </Animated.View>
  </TouchableWithoutFeedback>



          {showParticles &&
            particles.map((anim, i) => {
              const translateY = anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -80 - i * 10],
              });

              const opacity = anim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              });

              const colors = ['#cc00ff', '#ff9900', '#ffe600'];

              return (
                <Animated.View
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '45%',
                    transform: [{ translateY }],
                    opacity,
                  }}
                >
                  <Icon name="heart" size={20} color={colors[i % colors.length]} />
                </Animated.View>
              );
            })}
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText1}>Ainda sem curtidas</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText2}>Comece a descobrir músicas para ver suas curtidas aqui!</Text>
        </View>

        <View style={styles.nav}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText1}>Player</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText1}>Curtidas</Text>
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
    
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  iconButton: {
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000000',
    paddingVertical: 10,
    marginBottom: '0%',
    marginLeft: '0%',
    marginRight: '0%',
  },
  navItem: {
    padding: 10,
  },
  navText1: {
    fontSize: 16,
    color: '#ff3cf5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText1: {
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
  },
  contentText2: {
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
  },
  footer: {
    backgroundColor: '#4A90E2',
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: '#f80091',
  },
});

export default App;
