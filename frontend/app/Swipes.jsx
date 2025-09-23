import React, { useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';

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
  const { width, height } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: () => {
       
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  const animatedStyle = {
    transform: [...position.getTranslateTransform(), { rotate }],
    marginHorizontal: 20,
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentIndex < profiles.length && (
        <Animated.View
          style={[
            styles.card(width, height),
            animatedStyle
          ]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.profileName(width)}>
            {profiles[currentIndex].name}
          </Text>
          <Text style={styles.instruction(width)}>
            Arraste para curtir ou rejeitar
          </Text>
        </Animated.View>
      )}
      {currentIndex >= profiles.length && (
        <Text style={styles.finished(width)}>Não há mais perfis</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: (width, height) => ({
    width: width * 0.85,
    height: height * 0.65,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  profileName: (width) => ({
    fontSize: width * 0.07,
    fontWeight: 'bold',
    marginBottom: 20,
  }),
  instruction: (width) => ({
    fontSize: width * 0.04,
    color: '#888',
  }),
  finished: (width) => ({
    fontSize: width * 0.06,
    color: '#999',
  }),
});
