import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Cabeçalho com título "Perfil" */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      {/* Imagem de perfil e informações */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://placekitten.com/200/200' }} // Substitua com a URL da imagem do perfil
          style={styles.profileImage}
        />
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
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>

      {/* Rodapé com 3 páginas */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerText}>Player</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerText}>Curtidas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd3e8',
  },
  header: {
    backgroundColor: '#e0e0e0',
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'linear-gradient(to right, #FEC4C7, #D9A6C4)',
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
    height: 400,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fdfafc',
  },
  statLabel: {
    fontSize: 12,
    color: '#fff5fb',
  },
  logoutButton: {
    backgroundColor: '#ffffff',
    borderColor: '#ffc5b4',
    borderWidth: 2,
    padding: 10,
    marginTop: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#ffc5b4',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  footerItem: {
    padding: 10,
  },
  footerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default ProfileScreen;
