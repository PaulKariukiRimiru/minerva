import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { baseImageUrl, baseSocketUrl } from '../constants/axiosInstance';
import openSocket from 'socket.io-client';

class CoinProfile extends Component {
  static navigationOptions = {
    title: 'Profile',
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      coinPrice: {
        usdPrice: {},
        btcPrice: {},
        ethPrice: {}
      }
    }
  }

  socket;
  
  componentDidMount(){
    socket = openSocket(baseSocketUrl)
    const { navigation, fetchProfile, coinProfile } = this.props;
    const coin = navigation.getParam('coin')

    fetchProfile(coin.Id, () => {
      const { coinProfile } = this.props;
      socket.on('m', resp => this.updateCoinStatus(resp))
      socket.emit('SubAdd', { subs:  coinProfile.Subs } );
    })
  }

  componentWillUnmount() {
    const { navigation, coinProfile } = this.props;
    const coin = navigation.getParam('coin')
    socket.emit('SubRemove', { subs: coinProfile.Subs } );
    socket.close();
  }

  updateCoinStatus = (coin) => {
    const values = coin.split('~')
    const keys = ['Type', 'ExchangeName', 'FromCurrency', 'ToCurrency',
    'Flag', 'Price', 'LastUpdate', 'LastVolume', 'LastVolumeTo',
    'LastTradeId', 'Volume24h', 'Volume24hTo', 'MaskInt']
    let priceSnapshot = {};
    for(let i = 0; i < values.length; i++){
      priceSnapshot[keys[i]] = values[i]
    }

    if (priceSnapshot.ToCurrency) {
      console.log('Found some data')
      switch (priceSnapshot.ToCurrency) {
        case 'USD':
          this.setState({
            coinPrice: {
              ...this.state.coinPrice,
              usdPrice: {
                price: priceSnapshot.Price,
                flag: priceSnapshot.Flag,
                exchange: priceSnapshot.ExchangeName
              },
              loaded: true
            }
          });
          break;
        case 'BTC':
          this.setState({
            coinPrice: {
              ...this.state.coinPrice,
              btcPrice: {
                price: priceSnapshot.Price,
                flag: priceSnapshot.Flag,
                exchange: priceSnapshot.ExchangeName
              },
              loaded: true
            }
          });
          break;
        case 'ETH':
          this.setState({
            coinPrice: {
              ...this.state.coinPrice,
              ethPrice: {
                price: priceSnapshot.Price,
                flag: priceSnapshot.Flag,
                exchange: priceSnapshot.ExchangeName
              },
              loaded: true
            }
          });
          break;
        default:
          break;
      }
    }
  }

  render() {
    const { navigation, coinProfile, loading } = this.props;
    const coin = navigation.getParam('coin')

    const { coinPrice } = this.state
    const { usdPrice, btcPrice, ethPrice, loaded } = this.state.coinPrice;

    return (
        <View style={styles.container}>
          <Image source={{uri: baseImageUrl+coin.ImageUrl}} style={styles.image}/>
          <View style={styles.headLine}>
            <Text style={styles.mainText}>{coin.CoinName}</Text>
            <Text style={styles.subText}>{coin.Name}</Text>
          </View>
          <Text>Price against top currencies and coins</Text>
            <View style={styles.priceTableIndex}>
              <Text style={[styles.tableText, styles.textIndex]}>Coin</Text>
              <Text style={[styles.tableText, styles.textIndex]}>Price</Text>
              <Text style={[styles.tableText, styles.textIndex]}>Exchange</Text>
            </View>
            { !loaded ? <ActivityIndicator size="large" color="#424242" style={styles.loader}/> :
            <View style={styles.priceTable}>
              <View style={styles.priceTableData}>
                { Object.keys(usdPrice).length > 0 && <Text style={[styles.tableText, styles.textIndex]}>USD</Text> }
                { Object.keys(btcPrice).length > 0 && <Text style={[styles.tableText, styles.textIndex]}>BTC</Text> }
                { Object.keys(ethPrice).length > 0 && <Text style={[styles.tableText, styles.textIndex]}>ETH</Text> }
              </View>
              <View style={styles.priceTableData}>
                { Object.keys(usdPrice).length > 0 && <Text style={[styles.tableText, styles.textData, { color: usdPrice.flag === '1' ? '#4db6ac' : usdPrice.flag === '2' ? '#ff8a65' : '#424242'}]} allowFontScaling={true}>{usdPrice.price}</Text> }
                { Object.keys(btcPrice).length > 0 && <Text style={[styles.tableText, styles.textData, { color: btcPrice.flag === '1' ? '#4db6ac' : btcPrice.flag === '2' ? '#ff8a65' : '#424242'}]} allowFontScaling={true}>{btcPrice.price}</Text> }
                { Object.keys(ethPrice).length > 0 && <Text style={[styles.tableText, styles.textData, { color: ethPrice.flag === '1' ? '#4db6ac' : ethPrice.flag === '2' ? '#ff8a65' : '#424242'}]} allowFontScaling={true}>{ethPrice.price}</Text> }
              </View>
              <View style={styles.priceTableData}>
                { Object.keys(usdPrice).length > 0 && <Text style={[styles.tableText, styles.textData]}>{usdPrice.exchange}</Text> }
                { Object.keys(btcPrice).length > 0 && <Text style={[styles.tableText, styles.textData]}>{btcPrice.exchange}</Text> }
                { Object.keys(ethPrice).length > 0 && <Text style={[styles.tableText, styles.textData]}>{ethPrice.exchange}</Text> }
              </View>
            </View>}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: '100%',
    resizeMode: Image.resizeMode.contain,
    marginTop: 4,
  },
  mainText: {
    fontSize: 32,
    fontWeight: '400'
  },
  subText: {
    fontSize: 14,
    fontWeight: '200',
    alignSelf: 'center',
  },
  headLine: {
    marginTop: 12,
    marginBottom: 12,
  },
  priceTable: {
    flexDirection: 'row'
  },
  priceTableIndex: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   marginTop: 12
  },
  priceTableData: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  tableText: {
    marginLeft: 24,
    marginRight: 24
  },
  textIndex: {
    fontSize: 21,
    fontWeight: '300',
  },
  textData: {
    fontSize: 14,
    fontWeight:'200',
    alignSelf: 'center',
    color: '#424242'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default CoinProfile;
