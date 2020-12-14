import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';

const App = () => {
  const [counter, setCounter] = useState(0);

  const onClickHandler = () => {
    setCounter(counter + 1)
  }

  return (
    <View style={styles.body}>
      <Text style={styles.text}>{counter * 5}</Text>
      <Button title='Add' onPress={onClickHandler}></Button>
      <Text style={styles.text}>You clicked {counter} times</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#0000ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontStyle: 'italic',
    margin: 10,
  },
});

export default App;
