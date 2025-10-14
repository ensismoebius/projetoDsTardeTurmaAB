import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

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
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [dislikedProfiles, setDislikedProfiles] = useState([]);
  const position = useRef(new Animated.ValueXY()).current;

  const nextCard = () => {
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex((prev) => (prev + 1) % profiles.length);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gesture) => {
        if (gesture.dx > 120) {
          Animated.timing(position, {
            toValue: { x: width * 1.5, y: gesture.dy },
            duration: 250,
            useNativeDriver: false,
          }).start(() => {
            handleSwipe('right');
          });
        } else if (gesture.dx < -120) {
          Animated.timing(position, {
            toValue: { x: -width * 1.5, y: gesture.dy },
            duration: 250,
            useNativeDriver: false,
          }).start(() => {
            handleSwipe('left');
          });
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const handleSwipe = (direction) => {
    const profile = profiles[currentIndex];

    if (direction === 'right') {
      setLikedProfiles((prev) => [...prev, profile]);
    } else if (direction === 'left') {
      setDislikedProfiles((prev) => [...prev, profile]);
    }

    nextCard();
  };

  const nextCard = () => {
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex((prev) => prev + 1);
  };

 
  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, width / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const dislikeOpacity = position.x.interpolate({
    inputRange: [-width / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animatedStyle = {
    transform: [...position.getTranslateTransform(), { rotate }],
    marginHorizontal: '5%',
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {currentIndex < profiles.length ? (
  <Animated.View
    style={[styles.card, animatedStyle]}
    {...panResponder.panHandlers}
  >
    <Animated.Text style={[styles.likeLabel, { opacity: likeOpacity }]}>
      CURTIDA
    </Animated.Text>
    <Animated.Text
      style={[styles.dislikeLabel, { opacity: dislikeOpacity }]}
    >
      DISLIKE
    </Animated.Text>

    <Text style={styles.profileName}>{profiles[currentIndex].name}</Text>
    <Text style={styles.instruction}>Arraste para curtir ou rejeitar</Text>
  </Animated.View>
) : (
  <View style={styles.resultsContainer}>
    <Text style={styles.finished}>✨ Você chegou ao fim!</Text>

    <View style={styles.resultBox}>
      <Text style={styles.sectionTitle}>👍 Curtidos</Text>
      {likedProfiles.length > 0 ? (
        likedProfiles.map((profile) => (
          <Text key={profile.id} style={styles.resultText}>
            {profile.name}
          </Text>
        ))
      ) : (
        <Text style={styles.emptyText}>Nenhum perfil curtido</Text>
      )}
    </View>

    <View style={styles.resultBox}>
      <Text style={styles.sectionTitle}>👎 Rejeitados</Text>
      {dislikedProfiles.length > 0 ? (
        dislikedProfiles.map((profile) => (
          <Text key={profile.id} style={styles.resultText}>
            {profile.name}
          </Text>
        ))
      ) : (
        <Text style={styles.emptyText}>Nenhum perfil rejeitado</Text>
      )}
    </View>
  </View>
)}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  card: {
    width: width * 0.65,
    maxWidth: 400,
    minWidth: 250,
    height: height * 0.75,
    maxHeight: 650,
    minHeight: 400,
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
  },
  likeLabel: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
    borderWidth: 2,
    borderColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  dislikeLabel: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red',
    borderWidth: 2,
    borderColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  profileName: {
    fontSize: Math.min(width * 0.07, 28),
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  instruction: {
    fontSize: Math.min(width * 0.045, 18),
    color: '#888',
    textAlign: 'center',
  },
  finished: {
    fontSize: 22,
    color: '#999',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  resultText: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  resultsContainer: {
    alignItems: 'center',
  },
  finished: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#444',
  marginBottom: 25,
  textAlign: 'center',
},

resultsContainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 20,
},

resultBox: {
  width: '90%',
  backgroundColor: '#f9f9f9',
  borderRadius: 16,
  padding: 15,
  marginVertical: 10,
  elevation: 3,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 3 },
  shadowRadius: 6,
},

sectionTitle: {
  fontSize: 20,
  fontWeight: '600',
  marginBottom: 10,
  color: '#333',
  textAlign: 'center',
},

resultText: {
  fontSize: 16,
  color: '#555',
  marginTop: 6,
  textAlign: 'center',
},

emptyText: {
  fontSize: 14,
  color: '#aaa',
  fontStyle: 'italic',
  textAlign: 'center',
},
});
