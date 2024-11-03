import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Mylibrary {
  constructor() {
    this.library = [];
  }

  async getLibrary() {
    const libraryWordsString = await AsyncStorage.getItem("libraryWords");
    this.library = libraryWordsString ? JSON.parse(libraryWordsString) : [];
    return this.library;
  }

  async saveWord(word, translated, imageUrl) {
    await this.getLibrary();
    const exist = this.library.some((item) => item.word === word);
    if (exist) {
      alert("Word is already in your library");
      console.log("Kelime zaten kütüphanede var.");
      return false;
    }

    const newWord = { word, translated, imageUrl };
    this.library.push(newWord);

    await AsyncStorage.setItem("libraryWords", JSON.stringify(this.library));
    console.log("Kelime kaydedildi:", newWord);
    return true;
  }

  async deleteWord(word) {
    await this.getLibrary();

    this.library = this.library.filter((item) => item.word !== word);

    await AsyncStorage.setItem("libraryWords", JSON.stringify(this.library));
    console.log("Kelime silindi:", word);
  }
}
