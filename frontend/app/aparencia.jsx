import { View,Text, TouchableOpacity, StyleSheet } from "react-native";





export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titulo}>Aparência</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button1}>

        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button3}>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titulo:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button1:{
    backgroundColor: '#FDDF00',
    padding: 10,
    margin: 10,
    borderRadius: 15,
    height: 63,
    width: 63,
    borderWidth: 2,
    borderColor: 'white',
  },
  button2:{
    backgroundColor: '#F910A3',
    padding: 10,
    margin: 10,
    borderRadius: 15,
    height: 63,
    width: 63,
    borderWidth: 2,
    borderColor: 'white',
  },
  button3:{
    backgroundColor: '#8000D5',
    padding: 10,
    margin: 10,
    borderRadius: 15,
    height: 63,
    width: 63,
    borderWidth: 2,
    borderColor: 'white',
  },
});