import * as ImagePicker from "expo-image-picker";

import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function Index() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Precisamos de permissão para acessar suas fotos.");
      return;
    }

    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0 ) {
      setImage(result.assets[0].uri);
    }
    
    
  };

  return (
       
     <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>
                Toque para selecionar uma imagem
              </Text>
            </View>
          )}
        </TouchableOpacity>
          
  );
}

const styles = StyleSheet.create({
  imagePicker: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 25,
    alignSelf: "center",
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
  },

  placeholderText: {
    fontFamily: "fino",
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 10,
  },

})
