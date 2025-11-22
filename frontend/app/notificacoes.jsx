import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Notificacoes = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={["#8000d5", "#f910a3", "#fddf00"]} style={styles.gradient}>
      

      <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}>
        
        {/* 💛 LOGO GRANDE + TÍTULO */}
        <View style={styles.headerContainer}>
          <Image
            source={require("../assets/images/Logofundo.png")}
            style={styles.headerLogo}
          />
          <Text style={styles.title}>Notificações</Text>
        </View>

        {/* 🔔 LISTA DE NOTIFICAÇÕES */}
        <View style={styles.box}>
          {/* Notificação 1 */}
          <View style={styles.notifItem}>
            <Image
              source={{ uri: "" }}
              style={styles.avatar}
            />
            <Text style={styles.notifText}><Text style={styles.nome}>Fulano</Text> Seguiu você</Text>
          </View>

          {/* Notificação 2 */}
          <View style={styles.notifItem}>
            <Image
              source={{ uri: "" }}
              style={styles.avatar}
            />
            <Text style={styles.notifText}><Text style={styles.nome}>Nirvana</Text> Lançou uma música</Text>
          </View>

          {/* Notificação 3 */}
          <View style={styles.notifItem}>
            <Image
              source={{ uri: "" }}
              style={styles.avatar}
            />
            <Text style={styles.notifText}><Text style={styles.nome}>Soundgarden da Silva</Text> Mandou uma mensagem</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },


  backButton: {
    width: 42,
    height: 42,
    backgroundColor: "#D05CFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  /* 💛 HEADER */
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerLogo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },

  /* 🔔 BOX DE NOTIFICAÇÕES */
  box: {
    width: "58%",
	height: "100%",
   backgroundColor: "#1D143642",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backdropFilter: "blur(10px)",
  },

  notifItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomColor: "#ffffff55",
    borderBottomWidth: 1,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginRight: 14,
  },

  notifText: {
    color: "#fff",
    fontSize: 16,
  },

  nome: {
    fontWeight: "bold",
  }
});

export default Notificacoes;
