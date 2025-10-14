import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

const ProfileScreen = () => {
  const { width, height } = useWindowDimensions();

  // Escalonamento proporcional e limitado (evita exagero em telas muito grandes/pequenas)
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
  const rf = (size) => Math.round(clamp(size * (width / 390), size * 0.9, size * 1.6));

  const paddingHorizontal = Math.max(16, width * 0.06);
  const isSmallScreen = width < 360;

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <LinearGradient
        colors={['#FEC4C7', '#D9A6C4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.header,
          {
            padding: paddingHorizontal,
            borderBottomLeftRadius: rf(28),
            borderBottomRightRadius: rf(28),
            flexDirection: 'column',
            gap: rf(10),
          },
        ]}
      >
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
          style={[
            styles.profileImage,
            { width: rf(100), height: rf(100), borderRadius: rf(50), marginBottom: rf(5) },
          ]}
          resizeMode="cover"
        />

        <View style={[styles.profileInfo, { gap: rf(3) }]}>
          <Text style={[styles.username, { fontSize: rf(22 + (isSmallScreen ? -2 : 0)) }]}>Usuário</Text>
          <Text style={[styles.email, { fontSize: rf(13) }]}>blabla@gmail.com</Text>
          <Text style={[styles.memberSince, { fontSize: rf(12) }]}>Membro desde xx/xx/xxxx</Text>
          <Text style={[styles.location, { fontSize: rf(13) }]}>São Paulo, SP</Text>
        </View>
      </LinearGradient>

      {/* Estatísticas */}
      <View
        style={[
          styles.stats,
          {
            marginTop: rf(35),
            gap: rf(30),
            flexWrap: 'wrap',
            width: '100%',
            paddingHorizontal: width * 0.1,
          },
        ]}
      >
        {[
          { number: 0, label: 'Músicas Curtidas' },
          { number: 0, label: 'Artistas Descobertos' },
          { number: 0, label: 'Playlists Criadas' },
        ].map((item, i) => (
          <View key={i} style={[styles.statItem, { minWidth: rf(100) }]}>
            <Text style={[styles.statNumber, { fontSize: rf(26) }]}>{item.number}</Text>
            <Text style={[styles.statLabel, { fontSize: rf(13) }]}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Botão logout */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.logoutButton,
          {
            paddingVertical: rf(14),
            marginTop: rf(55),
            borderRadius: rf(14),
            width: width * 0.7,
            elevation: 3,
          },
        ]}
      >
        <Text style={[styles.logoutText, { fontSize: rf(17) }]}>Sair da Conta</Text>
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
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  profileImage: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    alignItems: 'center',
  },
  username: {
    fontWeight: 'bold',
    color: '#441b34',
  },
  email: {
    color: '#380d26',
  },
  memberSince: {
    color: '#2c2c2c',
  },
  location: {
    color: '#6b4b63',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    color: '#F1A7D5',
  },
  statLabel: {
    color: '#D9A6C4',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#F1A7D5',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f7e6f0',
  },
  footerItem: {
    padding: 10,
  },
  footerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#441b34',
  },
});

export default ProfileScreen;
