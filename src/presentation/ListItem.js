import React, { Component } from 'react';
import { View, Image,Text, StyleSheet, TouchableHighlight } from 'react-native';
import { baseImageUrl } from '../constants/axiosInstance';
export default class ListItem extends Component {

  onPress = () => {
    this.props.onPress(this.props.coin);
  }

  shouldComponentUpdate(){
    return false
  }

  render() {
    const { coin } = this.props;
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#e7e7e7'>
          <View style={[styles.container]}>
            <Image source={{uri: baseImageUrl+coin.ImageUrl}} style={styles.image}/>
            <View style={styles.textContainer}>
              <Text>{coin.CoinName}</Text>
              <Text>{coin.Name}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
    marginLeft: 12,
    marginRight: 12,
    flexDirection: 'row',
    borderColor: '#e7e7e7',
    borderBottomWidth: 1,
  },
  image: {
    height: 40,
    width: 40,
    marginRight: 20,
    resizeMode: Image.resizeMode.contain
  },
  textContainer: {
    justifyContent: 'flex-start',
    padding: 12
  },
  button: {
    flex: 1
  }
})
