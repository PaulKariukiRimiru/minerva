import React, { Component } from 'react';
import { View, Image,Text, StyleSheet, TouchableHighlight } from 'react-native';
import { baseImageUrl } from '../constants/axiosInstance';
import { Icon } from 'react-native-elements';

export default class ListItem extends Component {

  constructor(props){
    super(props);
    this.coin = props.coin;
  }

  onPress = () => {
    this.props.onPress(this.props.coin);
  }

  renderHomeItem = () => {
    const { coin } = this.props;
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor="#e7e7e7">
          <View style={[styles.container]}>
            <Image source={{uri: baseImageUrl + coin.ImageUrl}} style={styles.image}/>
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
      <View style={styles.profileContainer}>
        <View style={styles.profileTextContainer}>
          <Text style={styles.descriptionText}>{coin.currency}</Text>
          <Text style={[styles.priceText, {color: this.coin.flag === '1' ? '#4db6ac' : this.coin.flag === '2' ? '#ff8a65' : '#424242'}]}>{coin.price}</Text>
          <Text style={styles.descriptionText}>{coin.exchange}</Text>
        </View>
      </View>
    );
  }

  renderSocials = () => {
    const { coin } = this.props;
    return (
      <View style={styles.socialContainer}>
        <Icon
          raised
          name={coin.icon}
          type={'font-awesome'}
        />
        <Text>{coin.name}</Text>
        <Text>{coin.fType}</Text>
        <Text>{coin.followers}</Text>
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
      case 'coinSocials':
        return this.renderSocials();
      default:
        break;
    }
  }
}

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
  profileContainer: {
    height: 50,
    width: 330,
    flex: 1,
    margin: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  socialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    margin: 4,
  },
  image: {
    height: 40,
    width: 40,
    marginRight: 20,
    resizeMode: Image.resizeMode.contain,
  },
  textContainer: {
    justifyContent: 'flex-start',
    padding: 12,
  },
  profileTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  descriptionText: {
    fontSize: 16,
  },
  priceText: {
    fontSize: 18,
    marginLeft: 'auto',
    marginRight:'auto',
    alignContent: 'flex-start',
  },
  button: {
    flex: 1,
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
    alignItems: 'flex-start',
  },
});
