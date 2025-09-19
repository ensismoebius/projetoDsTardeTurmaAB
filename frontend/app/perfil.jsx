import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions } from 'react-native';

const ProfileScreen = () => {

  const { width, height } = useWindowDimensions();

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
  const rf = (size) => Math.round(clamp(size * (width / 375), size * 0.85, size * 1.6));

  const paddingHorizontal = Math.max(12, width * 0.05);


  return (
    <View style={styles.container}>
      
      <View style={[
          styles.header,
          { padding: paddingHorizontal, borderBottomLeftRadius: rf(20), borderBottomRightRadius: rf(20) },
        ]}>
        {/* COLOCAR IMAGEM */}
        
        <View style={styles.profileInfo}>
          <Text style={[styles.username, { fontSize: rf(24) }]}>Usuário</Text>
          <Text style={[styles.email, { fontSize: rf(14) }]}>blabla@gmail.com</Text>
          <Text style={[styles.memberSince, { fontSize: rf(12) }]}>Membro desde xx/xx/xxxx</Text>
          <Text style={[styles.location, { fontSize: rf(14) }]}>São Paulo, SP</Text>
        </View>
      </View>

      {/* Estatísticas do perfil */}
      <View style={[styles.stats, { marginTop: rf(30) }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { fontSize: rf(24) }]}>0</Text>
          <Text style={[styles.statLabel, { fontSize: rf(12) }]}>Músicas Curtidas</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { fontSize: rf(24) }]}>0</Text>
          <Text style={[styles.statLabel, { fontSize: rf(12) }]}>Artistas Descobertos</Text>
        </View>
      </View>

      {/* Botão de logout */}
      <TouchableOpacity style={[styles.logoutButton, { paddingVertical: rf(12), marginTop: rf(40), borderRadius: rf(10) }]}>
        <Text style={[styles.logoutText, { fontSize: rf(16) }]}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd3e8',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'linear-gradient(to right, #FEC4C7, #D9A6C4)', // Gradiente semelhante ao da imagem
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#441b34',
  },
  email: {
    fontSize: 14,
    color: '#380d26',
  },
  memberSince: {
    fontSize: 12,
    color: '#2c2c2c',
  },
  location: {
    fontSize: 14,
    color: '#cac3c7',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F1A7D5',
  },
  statLabel: {
    fontSize: 12,
    color: '#D9A6C4',
  },
  logoutButton: {
    backgroundColor: '#F1A7D5',
    padding: 10,
    marginTop: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
