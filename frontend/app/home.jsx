"use client"

import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native"

const App = () => {
  const router = useRouter()

  const artists = [
    {
      id: 1,
      name: "Soundgarden",
      posts: 24,
      description: "Lançou: Like Suicide - 03:12",
      avatar: "🎵",
    },
    {
      id: 2,
      name: "Marina Sena",
      posts: 24,
      description: "Lançou um álbum: Coisas Naturais\nDesmistificar - 2:54\nCoisas Naturais - 2:35\nMágico - 3:27",
      avatar: "🎤",
    },
    {
      id: 3,
      name: "Hole",
      posts: 24,
      description: "Biografia - Hole\nHole foi uma banda americana de rock alternativo...",
      avatar: "🎸",
    },
  ]

  const handleCall = (artistName) => {
    router.push(`/call/${artistName}`)
  }

  const handleMusic = (artistName) => {
    router.push(`/uploadMusic`)
  }

  const handleHome = () => {
    router.push(`/home`)
  }

  const handleLike = (artistName) => {
    router.push(`/curtidas`)
  }

  const handleMore = (artistName) => {
    router.push(`/perfilArtista`)
  }

  const handleProfilePress = () => {
    router.push(`/perfil`)
  }

  return (
    <LinearGradient
      colors={["#962fbf", "#d62976"]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Menu principal</Text>
          <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
            <View style={styles.headerAvatar}>
              <Text style={styles.headerAvatarText}>👤</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.welcomeCard}>
          <View style={styles.welcomeContent}>
            <View>
              <Text style={styles.welcomeGreeting}>Bem vindo, Fulano</Text>
              <Text style={styles.welcomeSubtitle}>D'Town!</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.fundoPost} showsVerticalScrollIndicator={false}>
          {artists.map((artist) => (
            <View key={artist.id} style={styles.artistCard}>
              <View style={styles.cardHeader}>
                <View style={styles.artistInfo}>
                  <View style={styles.smallAvatar}>
                    <Text style={styles.smallAvatarText}>{artist.avatar}</Text>
                  </View>
                  <View style={styles.artistDetails}>
                    <Text style={styles.artistName}>{artist.name}</Text>
                    <Text style={styles.postsCount}>{artist.posts} fev.</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.description}>{artist.description}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={() => router.push("/uploadMusic")}>
            <Text style={styles.footerIcon}>♪</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerButton} onPress={() => router.push("/curtidas")}>
            <Text style={styles.footerIcon}>❤️</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerButton} onPress={() => router.push("/perfilartista")}>
            <Text style={styles.footerIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  headerText: {
    color: "#999",
    fontSize: 14,
    fontWeight: "500",
  },
  profileButton: {
    padding: 0,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerAvatarText: {
    fontSize: 22,
  },
  welcomeCard: {
    backgroundColor: "#b535d4",
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  welcomeContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeGreeting: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  welcomeSubtitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  fundoPost: {
    flex: 1,
    paddingHorizontal: 15,
  },
  artistCard: {
    backgroundColor: "rgba(100, 50, 150, 0.6)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ff1493",
    padding: 14,
    marginBottom: 12,
  },
  cardHeader: {
    marginBottom: 12,
  },
  artistInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  smallAvatarText: {
    fontSize: 20,
  },
  artistDetails: {
    flex: 1,
  },
  artistName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  postsCount: {
    color: "#ddd",
    fontSize: 12,
    marginTop: 2,
  },
  description: {
    color: "#f0f0f0",
    fontSize: 13,
    lineHeight: 18,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  footerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  footerIcon: {
    fontSize: 24,
  },
})

export default App
