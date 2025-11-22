import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; 

const DATA = [
  { name: "Nirvana", followers: "33.188.700" },
  { name: "MCR", followers: "21.388.700" },
  { name: "Billie Eilish", followers: "21.388.700" },
  { name: "Clairo", followers: "21.388.700" },
  { name: "The Marias", followers: "21.388.700" },
  { name: "Rolling Stones", followers: "21.388.700" },
  { name: "Motörhead", followers: "18.388.700" },
  { name: "Joy Division", followers: "7.388.700" },
  { name: "The Smiths", followers: "3.388.700" },
];

// Gera uma cor aleatória constante para cada item
function getColor(seed) {
  const colors = ["#FF6B6B", "#4ECDC4", "#5567FF", "#FFA62B", "#DA70D6", "#00C9A7"];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash += seed.charCodeAt(i);
  return colors[hash % colors.length];
}

export default function FollowingScreen() {
  return (
    <LinearGradient
      colors={["#8A00D4", "#E60073", "#FF7A00"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Seguindo</Text>

        {/* Avatar simples do usuário */}
        <View style={[styles.avatar, { backgroundColor: "rgba(255,255,255,0.3)" }]}>
  <Ionicons name="person" size={22} color="#fff" />
</View>
      </View>

      {/* LISTA */}
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {/* Avatar com iniciais */}
            <View style={[styles.avatar, { backgroundColor: getColor(item.name) }]}>
              <Text style={styles.avatarText}>
                {item.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </Text>
            </View>

            <View>
              <Text style={styles.artist}>{item.name}</Text>
              <Text style={styles.followers}>{item.followers} seguidores</Text>
            </View>

            <Ionicons name="checkmark" size={22} color="#fff" style={styles.check} />
          </View>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "600",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 40,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  artist: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "600",
  },
  followers: {
    color: "#ddd",
    fontSize: 13,
  },
  check: {
    marginLeft: "auto",
  },
});
