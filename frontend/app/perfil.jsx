import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
function irParaindex() {
  roteador.push('/');
}
const roteador = useRouter();
const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        {/* COLOCAR IMAGEM */}
        
        <View style={styles.profileInfo}>
          <Text style={styles.username}>Usuário</Text>
          <Text style={styles.email}>blabla@gmail.com</Text>
          <Text style={styles.memberSince}>Membro desde xx/xx/xxxx</Text>
          <Text style={styles.location}>São Paulo, SP</Text>
        </View>
      </View>

      {/* Estatísticas do perfil */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Músicas Curtidas</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Artistas Descobertos</Text>
        </View>
      </View>

      {/* Botão de logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={irParaindex}>
        <Text style={styles.logoutText}>Sair da Conta</Text>
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
