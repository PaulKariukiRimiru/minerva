import React, { Component } from 'react'
import { View, Text } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

export default class CoinProfile extends Component {
  render() {
    const { navigation } = this.props;
    const coin = navigation.getParam('coin')
    return (
      <Transition appear='left' disappear='right' >
        <View>
          <Text>{coin.item.CoinName}</Text>
        </View>
      </Transition>
    )
  }
}
