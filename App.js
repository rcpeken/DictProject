import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Search from "./Search";
import Navi from "./Navi";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Enterance/Login";

export default function App() {
  return (
    <Login/>
    // <View style={styles.container}>
    //   <NavigationContainer>
    //     <Search />
    //     <Navi />
    //   </NavigationContainer>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ca2e2e",
  },
});
