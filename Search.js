import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState, useEffect } from "react";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import Mylibrary from "./Mylibrary";

function Search({ navigation }) {
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [source, setSource] = useState("tr");
  const [target, setTarget] = useState("en");
  const [imageUrl, setImageUrl] = useState("");
  const [libraryWords, setLibraryWords] = useState([]);
  const [myLibrary] = useState(new Mylibrary());
  const [isSourcePickerVisible, setSourcePickerVisible] = useState(false);
  const [isTargetPickerVisible, setTargetPickerVisible] = useState(false);

  const flags = {
    tr: require("./assets/tr-flag.png"),
    en: require("./assets/eng-flag.png"),
  };

  const API_KEY = `AIzaSyBkCHccGpqoOMjlHaSeCdYivaoBbnk5ey0`;

  const CX = "325a6c5cc14f94e35";

  const handleTranslation = async () => {
    try {
      const response = await axios.post(
        ` https://translation.googleapis.com/language/translate/v2`,
        {},
        {
          params: {
            q: word,
            source: source,
            target: target,
            key: "AIzaSyBHw6RLZfTNeSlqL0E08l7EglV_2sQEBdM",
          },
        }
      );
      setTranslation(response.data.data.translations[0].translatedText);
      ImageUnsplash(word);
    } catch (error) {
      console.log("API Hatası : ", error);
    }
  };

  const ImageUnsplash = async (query) => {
    try {
      console.log("arama sorgusu", query);
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1`,
        {
          params: {
            q: query,
            cx: CX,
            key: API_KEY,
            searchType: "image",
            num: 1,
          },
        }
      );

      if (response.data.items && response.data.items[0]) {
        const firstImageUrl = response.data.items[0].link;
        console.log("Bulunan Resim URL:", firstImageUrl);
        setImageUrl(firstImageUrl);

        console.log(response.data);
      } else {
        console.log("resim bulunamadı");
        setImageUrl("");
      }
    } catch (error) {
      console.error("Google custom search error:", error);
    }
  };

  useEffect(() => {
    loadLibrary();
  }, []);

  const saveStorage = async (libraryWords) => {
    try {
      await AsyncStorage.setItem("libraryWords", JSON.stringify(libraryWords));
      console.log("Veriler Kaydedildi");
    } catch (error) {
      console.error("Veri kaydetme hatası", error);
    }
  };

  const loadLibrary = async () => {
    try {
      const storedWords = await AsyncStorage.getItem("libraryWords");
      if (storedWords !== null) {
        const parseWords = JSON.parse(storedWords);
        setLibraryWords(parseWords);
        console.log("Veriler yüklendi: ", parseWords);
      }
    } catch (error) {
      console.error("Veri yükleme hatası: ", error);
    }
  };

  const saveLibrary = async () => {
    const isSaved = await myLibrary.saveWord(word, translation, imageUrl);

    if (isSaved) {
      const updatedLibrary = await myLibrary.getLibrary();
      setLibraryWords(updatedLibrary);
      await saveStorage(updatedLibrary);
    }// } else {
    //   alert("Failed to add the world");
    // }
  };
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("Tüm veriler silindi");
      setLibraryWords([]);
    } catch (error) {
      console.log("verileri temizleme hatası", error);
    }
  };

  const goLibrary = () => {
    const words = libraryWords;
    console.log("Gönderilen kelimeler:", words);
    navigation.navigate("Library", {
      libraryWords: words,
      myLibrary: myLibrary,
    });
  };

  return (
    <ImageBackground
      source={require("./assets/hd wallpaper abstract 4.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            placeholder="Enter a word"
            value={word}
            onChangeText={(text) => setWord(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setSourcePickerVisible(true)}
        >
          <Image source={flags[source]} style={styles.flagImage} />
          <Text style={styles.pickerText}>
            {source === "tr" ? "Turkce" : "Ingilizce"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setTargetPickerVisible(true)}
        >
          <Image source={flags[target]} style={styles.flagImage} />
          <Text style={styles.pickerText}>
            {target === "en" ? "Ingilizce" : "Turkce"}
          </Text>
        </TouchableOpacity>
        <View style={styles.centeredView}>
          <Modal
            visible={isSourcePickerVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    onPress={() => {
                      setSource("tr");
                      setSourcePickerVisible(false);
                    }}
                  >
                    <Image source={flags["tr"]} style={styles.modalFlag} />
                    <Text>Turkce</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setSource("en");
                      setSourcePickerVisible(false);
                    }}
                  >
                    <Image source={flags["en"]} style={styles.modalFlag} />
                    <Text>Ingilizce</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            visible={isTargetPickerVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    onPress={() => {
                      setTargetPickerVisible(false);
                      setTarget("tr");
                    }}
                  >
                    <Image source={flags["tr"]} style={styles.modalFlag} />
                    <Text>Turkce</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setTarget("en");
                      setTargetPickerVisible(false);
                    }}
                  >
                    <Image source={flags["en"]} style={styles.modalFlag} />
                    <Text>Ingilizce</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <Button
          mode="contained"
          onPress={handleTranslation}
          style={{ marginTop: 10, backgroundColor: "#48bee2" }}
        >
          Çevir
        </Button>
        <View
          style={[
            styles.answerContainer,
            { borderColor: imageUrl ? "#2da9e2" : "transparent" },
          ]}
        >
          {imageUrl ? (
            <Image
              resizeMode="contain"
              source={{ uri: imageUrl }}
              style={styles.image}
            />
          ) : null}
          {translation ? (
            <Text style={styles.translation}> {translation}</Text>
          ) : null}
        </View>
        <Button
          mode="contained"
          onPress={saveLibrary}
          style={{ marginTop: 20, backgroundColor: "#48bee2" }}
        >
          Kütüphaneye Ekle
        </Button>
        <Button
          mode="contained"
          onPress={goLibrary}
          style={{ marginTop: 20, backgroundColor: "#48bee2" }}
        >
          Kelimeleri Göster
        </Button>
      </View>
    </ImageBackground>
  );
}

export default Search;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 15,
    backgroundColor: "#4eaccb",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  flagImage: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  pickerText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "500",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalFlag: {
    width: 50,
    height: 30,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  answerContainer: {
    marginTop: 30,
    alignSelf: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#2da9e2",
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  translation: {
    alignSelf: "center",
    padding: 10,
    fontSize: 20,
    fontWeight: "600",
    color: "#2da9e2",
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: "#48bee2",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
