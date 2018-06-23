import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import Home from './src/pages/Containers/Home';
import CoinProfile from './src/pages/Containers/CoinProfile';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import {
  View,
  StyleSheet,
} from 'react-native';

const RenderScene = createStackNavigator(
  {
    home: Home,
    coinProfile: CoinProfile,
  },
  {
    initialRouteName: 'home',
    navigationOptions: {
      title: 'Minerva',
      headerStyle: {
        backgroundColor: '#424242',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const drawer = createDrawerNavigator({
  home: {
    screen: Home,
  },
  coinProfile: {
    screen: CoinProfile,
  },
});
export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <RenderScene />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  screnes: {
    flex: 1,
  },
});
