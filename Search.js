import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';


const Search = () => {
  const [text, setText] = React.useState("");

  return (
    <TextInput
    style={styles.wordSearch}
      label="Enter a Word"
      value={text}
      onChangeText={text => setText(text)}
      selectionHandleColor='blue'
    />
  );
};

export default Search;


const styles = StyleSheet.create({
    wordSearch: {
      marginTop: 100,
      margin: 25,

    },
  });