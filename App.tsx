import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView, StyleSheet,
} from 'react-native';

import { Provider } from 'react-redux';
import store from './src/store';
import NavigationRoot from './src/navigation';


function App(): JSX.Element {

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Provider store={store}>
          <NavigationRoot />
        </Provider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App;
