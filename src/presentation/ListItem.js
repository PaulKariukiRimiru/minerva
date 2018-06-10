import React, { Component } from 'react';
import { View, Image,Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';
import { baseImageUrl } from '../constants/axiosInstance';
export default class ListItem extends Component {

  onPress = () => {
    this.props.onPress(this.props.coin);
  }

  renderHomeItem = () => {
    const { coin } = this.props
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
    );
  }

  renderCoinProfileItem = () => {
    const { coin } = this.props;
    return (
      <View style={{ height: 50, width: 330, flex: 1, margin: 8, backgroundColor: '#ffffff', borderRadius: 8}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 8}}>
          <Text style={{fontSize: 16}}>{coin.currency}</Text>
          <Text style={{fontSize: 18, marginLeft: 'auto', marginRight:'auto', color: coin.flag === '1' ? '#4db6ac' : coin.flag === '2' ? '#ff8a65' : '#424242' }}>{coin.price}</Text>
          <Text style={{fontSize: 16}}>{coin.exchange}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { view } = this.props;
    switch (view) {
      case 'home':
        return this.renderHomeItem();
      case 'coinProfile':
        return this.renderCoinProfileItem();
        return 
      default:
        break;
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 70,
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
  },
  cardStyle: {
    height: 70,
    width: '100%',
    margin: 12,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    alignItems: 'start',
  }
})
