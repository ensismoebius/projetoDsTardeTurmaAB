import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const SQUARE_WIDTH = width * 0.80;
const SQUARE_HEIGHT = height * 0.60;

const profiles = [
  { id: 1, name: 'Perfil 1' },
  { id: 2, name: 'Perfil 2' },
  { id: 3, name: 'Perfil 3' },
  { id: 4, name: 'Perfil 4' },
  { id: 5, name: 'Perfil 5' },
  { id: 6, name: 'Perfil 6' },
  { id: 7, name: 'Perfil 7' },
  { id: 8, name: 'Perfil 8' },
  { id: 9, name: 'Perfil 9' },
  { id: 10, name: 'Perfil 10' },
];

export default function TinderSwipeSquare() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },

      onPanResponderRelease: (evt, gesture) => {
        if (gesture.dx > 120) {
          // Swipe right - Like
          Animated.timing(position, {
            toValue: { x: width * 1.5, y: gesture.dy },
            duration: 250,
            useNativeDriver: false,
          }).start(() => {
            nextCard();
          });
        } else if (gesture.dx < -120) {
          // Swipe left - Dislike
          Animated.timing(position, {
            toValue: { x: -width * 1.5, y: gesture.dy },
            duration: 250,
            useNativeDriver: false,
          }).start(() => {
            nextCard();
          });
        }
        else {
          // Voltar para centro
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const nextCard = () => {
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex((prev) => (prev + 1) % profiles.length);
  };

  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  const animatedStyle = {
    transform: [...position.getTranslateTransform(), { rotate }],
    marginHorizontal: 20, // Espaço nas laterais para garantir que não grude
  };

  return (
    <View style={styles.container}>
      {currentIndex < profiles.length && (
        <Animated.View
          style={[styles.card, animatedStyle]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.profileName}>{profiles[currentIndex].name}</Text>
          <Text style={styles.instruction}>Arraste para curtir ou rejeitar</Text>
        </Animated.View>
      )}
      {currentIndex >= profiles.length && (
        <Text style={styles.finished}>Não há mais perfis</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: SQUARE_WIDTH,
    height: SQUARE_HEIGHT,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    padding: 20,
    justifyContent: 'center', // centraliza conteúdo verticalmente
    alignItems: 'center',
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    color: '#888',
  },
  finished: {
    fontSize: 22,
    color: '#999',
  },
});
