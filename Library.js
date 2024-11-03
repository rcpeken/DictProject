import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

const Library = ({ route, navigation }) => {
  const [libraryWords, setLibraryWords] = useState([]);

  useEffect(() => {
    const fetchLibrary = async () => {
      const updatedLibrary = await route.params.myLibrary.getLibrary();
      setLibraryWords(updatedLibrary);
    };

    fetchLibrary();
  }, []);

  const handleDelete = async (word) => {
    await route.params.myLibrary.deleteWord(word);
    const updatedLibrary = await route.params.myLibrary.getLibrary();
    setLibraryWords(updatedLibrary);
  };

  const backTranslate = async () => {
    const updatedLibrary = await route.params.myLibrary.getLibrary();
    setLibraryWords(updatedLibrary);
    navigation.navigate("Search", { libraryWords: updatedLibrary });
  };

  return (
    <ImageBackground
      source={require("./assets/hd wallpaper abstract 4.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <FlatList
          data={libraryWords}
          ListHeaderComponent={<View style = {{height:30}}/>}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Kütüphanenizde hiç kelime yok!
              </Text>
              <Text style={styles.suggestionText}>
                Yeni kelimeler eklemeye başlayın!
              </Text>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDelete(item.word)}>
              <View style={styles.wordItem}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.wordImage}
                />
                <Text style={styles.wordText}>
                  {item.word} - {item.translated}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <Button
          onPress={backTranslate}
          mode="contained"
          style={{ backgroundColor: "#48bee2" }}
        >
          Çeviriye Dön
        </Button>
      </View>
    </ImageBackground>
  );
};

export default Library;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    
  },
  wordItem: {
    backgroundColor: "#e0f7fa",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  wordImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  wordText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },

  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  suggestionText: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
});
