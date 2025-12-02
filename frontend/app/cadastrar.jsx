import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Cadastro = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const rf = useCallback(
    (size) => Math.round(size * (width / 390)),
    [width]
  );


  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


  const [isPressing, setIsPressing] = useState(false);
  const [loading, setLoading] = useState(false);


  const [errors, setErrors] = useState({});

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  
  const validateFields = useCallback(() => {
    const newErrors = {};
    if (!nome.trim()) newErrors.nome = "Informe um nome válido.";
    if (!email.includes("@")) newErrors.email = "Email inválido.";
    if (senha.length < 6)
      newErrors.senha = "A senha deve ter pelo menos 6 caracteres.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [nome, email, senha]);


  const handleCadastro = async () => {
    if (loading) return;
    if (!validateFields()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Date.now(),
          email,
          username: nome.replace(/\s+/g, "").toLowerCase(),
          name: nome,
          password_hash: senha,
          latitude: 0.0,
          longitude: 0.0,
          type: "normal",
          created_at: new Date().toISOString().split("T")[0],
        }),
      });

      if (response.ok) {
        Alert.alert("Cadastro", "Usuário cadastrado com sucesso!");
      } else {
        const errorData = await response.json();
        Alert.alert(
          "Erro",
          `Falha no cadastro: ${errorData.detail || "Erro desconhecido"}`
        );
      }
    } catch (error) {
      Alert.alert("Erro", "Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

 
  const dyn = useMemo(
    () => ({
      logo: {
        width: rf(180),
        height: rf(180),
      },
      input: {
        height: rf(60),
        borderRadius: rf(20),
        paddingHorizontal: rf(15),
        fontSize: rf(16),
      },
      title: {
        fontSize: rf(28),
        marginBottom: rf(20),
      },
      botao: {
        height: rf(60),
        borderRadius: rf(35),
      },
      botaoTexto: {
        fontSize: rf(18),
      },
      containerPadding: {
        paddingHorizontal: rf(25),
      },
    }),
    [rf]
  );

  return (
    <Pressable onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={["#8000d5", "#f910a3", "#fddf00"]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safe}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={styles.scrollArea}
              keyboardShouldPersistTaps="handled"
            >
              
              <TouchableOpacity
                style={styles.backCircle}
                onPress={() => navigation.goBack()}
              >
                <AntDesign name="arrowleft" size={22} color="#fff" />
              </TouchableOpacity>

              
              <Animated.View style={{ opacity: fadeAnim, width: "100%" }}>
                
                <View style={styles.logoWrap}>
                  <Image
                    source={require("../assets/images/Logofundo.png")}
                    style={[styles.logo, dyn.logo]}
                  />
                </View>

              
                <View style={[styles.formContainer, dyn.containerPadding]}>
                  <Text style={[styles.title, dyn.title]}>Cadastro</Text>

                  {[
                    {
                      key: "nome",
                      placeholder: "Nome de usuário",
                      value: nome,
                      setter: setNome,
                      error: errors.nome,
                    },
                    {
                      key: "email",
                      placeholder: "Email",
                      value: email,
                      setter: setEmail,
                      error: errors.email,
                      props: {
                        keyboardType: "email-address",
                        autoCapitalize: "none",
                      },
                    },
                    {
                      key: "senha",
                      placeholder: "Senha",
                      value: senha,
                      setter: setSenha,
                      error: errors.senha,
                      props: { secureTextEntry: true },
                    },
                  ].map(({ key, placeholder, value, setter, error, props }) => (
                    <React.Fragment key={key}>
                      <TextInput
                        style={[
                          styles.input,
                          dyn.input,
                          error && { borderColor: "#ff8080" },
                        ]}
                        placeholder={placeholder}
                        placeholderTextColor="#FFF"
                        value={value}
                        onChangeText={(t) => {
                          setter(t);
                          if (error)
                            setErrors((prev) => ({ ...prev, [key]: null }));
                        }}
                        {...props}
                      />
                      {error && (
                        <Text style={styles.errorText}>{error}</Text>
                      )}
                    </React.Fragment>
                  ))}

                 
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={[
                      styles.botao,
                      dyn.botao,
                      isPressing && { transform: [{ scale: 0.98 }] },
                      loading && { opacity: 0.6 },
                    ]}
                    onPressIn={() => setIsPressing(true)}
                    onPressOut={() => setIsPressing(false)}
                    onPress={handleCadastro}
                    disabled={loading}
                  >
                    <Text style={[styles.botaoTexto, dyn.botaoTexto]}>
                      {loading ? "Enviando..." : "Cadastrar"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  scrollArea: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },

  backCircle: {
    position: "absolute",
    top: 10,
    left: 15,
    zIndex: 10,
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  logoWrap: {
    alignItems: "center",
    marginBottom: 20,
  },

  logo: {
    resizeMode: "contain",
  },

  formContainer: {
    width: "100%",
    maxWidth: 450,
    alignSelf: "center",
  },

  title: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "negrito",
  },

  input: {
    width: "100%",
    backgroundColor: "#ffffff30",
    borderColor: "#fff",
    borderWidth: 1.6,
    marginVertical: 8,
    color: "#fff",
    fontFamily: "normal",
  },

  errorText: {
    color: "#ff8080",
    marginTop: 3,
    marginLeft: 8,
    fontSize: 14,
  },

  botao: {
    marginTop: 18,
    backgroundColor: "#1d1436",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#8000d5",
  },

  botaoTexto: {
    color: "#fff",
    fontFamily: "negrito",
  },
});

export default Cadastro;
