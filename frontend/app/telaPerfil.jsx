import { Text, View, ScrollView, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

export default function Index() {
  return (
    <LinearGradient colors={["#8B5CF6", "#EAB308"]} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header com botão voltar */}
        <View style={{ paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20 }}>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "rgba(255,255,255,0.2)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Seção do perfil */}
        <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
          {/* Foto do perfil */}
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "#4A5568",
              marginBottom: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>👤</Text>
          </View>

          {/* Nome do usuário */}
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            Fulano D`Town
          </Text>

          {/* Estatísticas */}
          <Text
            style={{
              color: "white",
              fontSize: 16,
              marginBottom: 20,
            }}
          >
            23 seguidores • 4 seguindo
          </Text>

          {/* Botão Seguir */}
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(139, 69, 19, 0.8)",
              paddingHorizontal: 40,
              paddingVertical: 12,
              borderRadius: 25,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Seguir +
            </Text>
          </TouchableOpacity>

          {/* Info do usuário */}
          <Text
            style={{
              color: "white",
              fontSize: 14,
              marginBottom: 20,
            }}
          >
            yrCapsaicin 🎵 naousoiphone
          </Text>
        </View>

        {/* Bio */}
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: "rgba(139, 69, 19, 0.6)",
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              lineHeight: 24,
            }}
          >
            eeeer amo ouçar musga{"\n"}amo tumati tamem
          </Text>
        </View>

        {/* Tags de gêneros */}
        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "rgba(255, 182, 193, 0.8)",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
                marginBottom: 10,
                width: "48%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  textAlign: "center",
                  fontWeight: "500",
                }}
              >
                Rock
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "rgba(255, 182, 193, 0.8)",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
                marginBottom: 10,
                width: "48%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  textAlign: "center",
                  fontWeight: "500",
                }}
              >
                Metal industrial
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "rgba(255, 182, 193, 0.8)",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
                marginBottom: 10,
                width: "48%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  textAlign: "center",
                  fontWeight: "500",
                }}
              >
                Forró
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "rgba(255, 182, 193, 0.8)",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
                marginBottom: 10,
                width: "48%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  textAlign: "center",
                  fontWeight: "500",
                }}
              >
                Glam Rock
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Artistas mais ouvidos */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Artistas mais ouvidos
          </Text>

          {/* Lista de artistas */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(255, 182, 193, 0.6)",
              borderRadius: 15,
              padding: 15,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#4A5568",
                marginRight: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 12 }}>🎵</Text>
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Jackson do Pandeiro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(255, 182, 193, 0.6)",
              borderRadius: 15,
              padding: 15,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#4A5568",
                marginRight: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 12 }}>🎸</Text>
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Nirvana
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(255, 182, 193, 0.6)",
              borderRadius: 15,
              padding: 15,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#4A5568",
                marginRight: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 12 }}>🎤</Text>
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Marilyn Manson
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}
