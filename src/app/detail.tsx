import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View, Text, Image } from "react-native";

export default function Detail() {
  const { id, name, image } = useLocalSearchParams();
  const artist_data = {
    id,
    name,
    image
  }

  return (
    <View style={styles.container}>
      <Image
        testID="artist-image"
        style={styles.image}
        source={{ uri: artist_data.image as string }}
      />
      <Text 
        style={styles.name}>
        {artist_data.name}
      </Text>
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0,
    alignItems: "center",
    justifyContent: 'center'
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 30
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold'
  },
});