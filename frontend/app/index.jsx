import React, { useState } from "react";
import { Text, TouchableOpacity, TextInput, View, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView,useWindowDimensions} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const router = useRouter();

  const { width, height } = useWindowDimensions();

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  const rf = (size) =>
    Math.round(clamp(size * (width / 375), Math.max(12, size * 0.85), size * 1.6));

  const containerPadding = Math.max(12, width * 0.06);
  const maxContentWidth = Math.min(width * 0.94, 720);

  function entrar() {
    router.push("/uploadMusic");
  }

    function cadastro() {
    router.push("/cadastrar");
  }
  

  return (
    <LinearGradient
      colors={["#fedea6", "#fc7ea7", "#7466e6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View
            style={[
              styles.innerContainer,
              {
                paddingHorizontal: containerPadding,
                maxWidth: maxContentWidth,
                alignSelf: "center",
              },
            ]}
          >
            <Text
              style={[
                styles.title,
                { fontSize: rf(26), marginBottom: Math.max(8, height * 0.01) },
              ]}
            >
              Descubra Música Local
            </Text>
            <Text style={[styles.subtitle, { fontSize: rf(15) }]}>
              Conecte-se com artistas da sua região
            </Text>

            <Text style={[styles.label, { fontSize: rf(14) }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                { height: clamp(height * 0.065, 48, 68), fontSize: rf(16) },
              ]}
              placeholder="email@exemplo.com"
              placeholderTextColor="#666"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={[styles.label, { fontSize: rf(14) }]}>Senha</Text>
            <TextInput
              style={[
                styles.input,
                { height: clamp(height * 0.065, 48, 68), fontSize: rf(16) },
              ]}
              placeholder="••••••••"
              placeholderTextColor="#666"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />

            <TouchableOpacity
              style={[
                styles.button,
                { paddingVertical: clamp(height * 0.02, 12, 20) },
              ]}
              onPress={entrar}
            >
              <Text style={[styles.buttonText, { fontSize: rf(16) }]}>Entrar</Text>
            </TouchableOpacity >

            <TouchableOpacity onPress={cadastro}>
              <Text style={[styles.footer, { fontSize: rf(14) }]}>
                Não tem uma conta? <Text style={styles.footerLink}>Cadastre-se</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    color: "#fff",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#5a4ae3",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  footer: {
    color: "#fff",
    textAlign: "center",
  },
  footerLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
