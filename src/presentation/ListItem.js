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
            <View style={styles.textcontainer}>
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

  renderExchanges = () => {
    const { MARKET, TOSYMBOL, PRICE, OPEN24HOUR, HIGH24HOUR, LOW24HOUR, FLAGS } = this.props.coin;
    const {
      exchangesContainer,
      subContainer,
      textContainer,
      textDescription,
      textData,
      pricetextContainer,
      mainPriceText,
      marketTextContainer,
    } = styles;
    return (
      <View style={exchangesContainer}>
        <View style={pricetextContainer}>
          <Text numberOfLines={1} style={[textData, mainPriceText]}>{TOSYMBOL} {PRICE}</Text>
        </View>
        <View style={subContainer}>
          <View style={marketTextContainer}>
            <Text numberOfLines={1} style={textDescription}>Market {MARKET}</Text>
            <Text numberOfLines={1} style={[textDescription, { color: FLAGS === '1' ? '#ff8a65' : FLAGS === '2' ? '#4db6ac' : '#424242',}]}>
              Price {FLAGS === '1' ? 'dropping' : FLAGS === '2' ? 'increasing' : 'unchanged'}
            </Text>
          </View>
        </View>
        <View style={subContainer}>
          <View style={textContainer}>
            <Text numberOfLines={1} style={textDescription}>Opening</Text>
            <Text numberOfLines={1} style={textData}>{OPEN24HOUR}</Text>
          </View>
          <View style={textContainer}>
            <Text numberOfLines={1} style={textDescription}>Highest</Text>
            <Text numberOfLines={1} style={textData}>{HIGH24HOUR}</Text>
          </View>
          <View style={textContainer}>
            <Text numberOfLines={1} style={textDescription}>Lowest</Text>
            <Text numberOfLines={1} style={textData}>{LOW24HOUR}</Text>
          </View>
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
      case 'coinSocials':
        return this.renderSocials();
      case 'coinAggregate':
        return this.renderExchanges();
      default:
        break;
    }
  }
}

const styles = StyleSheet.create({
  exchangesContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: 330,
    padding: 4,
    margin: 4,
    borderColor: '#e7e7e7',
    borderRadius: 4,
    borderBottomWidth: 1,
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  pricetextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainPriceText: {
    fontSize: 18,
    fontWeight: '400',
  },
  marketTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: 2,
  },
  textDescription: {
    fontSize: 12,
    fontWeight: '100',
  },
  textData: {
    fontSize: 15,
    fontWeight: '400',
  },
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
  textcontainer: {
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
