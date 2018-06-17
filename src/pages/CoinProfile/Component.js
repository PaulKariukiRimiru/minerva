import React, { Component } from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import Render from './Render';

const window = Dimensions.get('window');
class CoinProfile extends Component {
  static navigationOptions = {
    title: 'Profile',
  }

  constructor(props, context) {
    super(props, context);
    this.inputRefs = {};
    this.state = {
      coinPrice: [],
      loaded: false,
      selection: 'USD',
      items: [
        {
          label: 'US Dollar',
          value: 'USD',
        },
        {
          label: 'Bitcoin',
          value: 'BTC',
        },
        {
          label: 'Etherium',
          value: 'ETH',
        },
        {
          label: 'Litcoin',
          value: 'LTC',
        },
        {
          label: 'DigitalCash',
          value: 'DASH',
        },
    ],
    };
    //this.socket = openSocket(baseSocketUrl);
    this.socialInfo = [];
  }

  componentDidMount(){
    const { navigation, fetchProfile, fetchSocials, fetchAggregate } = this.props;
    const coin = navigation.getParam('coin');
    fetchAggregate(coin.Name, 'USD', () => {
      fetchProfile(coin.Id, () => {
        fetchSocials(coin.Id, () => {
          //const { coinProfile } = this.props;
          this.processSocialInfo();
          // this.socket.on('m', resp => this.updateCoinStatus(resp));
          // this.socket.emit('SubAdd', { subs:  coinProfile.Subs } );
        });
      });
    });
  }

  componentWillUnmount() {
    // const { coinProfile } = this.props;
    // this.socket.emit('SubRemove', { subs: coinProfile.Subs } );
    // this.socket.close();
  }

  updateCoinStatus = (coin) => {
    const values = coin.split('~');
    const keys = ['Type', 'ExchangeName', 'FromCurrency', 'ToCurrency',
    'Flag', 'Price', 'LastUpdate', 'LastVolume', 'LastVolumeTo',
    'LastTradeId', 'Volume24h', 'Volume24hTo', 'MaskInt'];
    let priceSnapshot = {};
    for (let i = 0; i < values.length; i++){
      priceSnapshot[keys[i]] = values[i];
    }

    if (priceSnapshot.ToCurrency) {
      const allowedCurrencies = ['USD', 'BTC', 'ETH'];
      if (allowedCurrencies.includes(priceSnapshot.ToCurrency) && priceSnapshot.Flag !== '4') {
        this.setState({
          coinPrice: this.addOrReplace(this.state.coinPrice,
            {
              Id: Math.random(),
              currency: priceSnapshot.ToCurrency,
              price: priceSnapshot.Price,
              flag: priceSnapshot.Flag,
              exchange: priceSnapshot.ExchangeName,
            }),
          loaded: true,
        });
      }
    }
  }

  addOrReplace = (array, priceItem) => {
    const i = array.findIndex(item => item.currency === priceItem.currency);
    if (i > -1) {array[i] = priceItem;}
    else {array.push(priceItem);}

    return array;
  }

  processSocialInfo = () => {
    const { coinSocials } = this.props;
    Object.keys(coinSocials).length > 0 &&
      Object.keys(coinSocials).map((dataKey, index) => {
        const data = coinSocials[dataKey];
        switch (dataKey) {
          case 'CryptoCompare':
            this.socialInfo.push({
              name: dataKey,
              followers: data.Followers,
              url: '',
              icon: '',
              Id: Math.random(),
              fType:'Followers',
            });
            break;
          case 'Twitter':
            if (data.Points !== 0) {
              this.socialInfo.push({
                name: data.name,
                followers: data.followers,
                url: data.link,
                icon: 'twitter',
                Id: Math.random(),
                fType:'Followers',
              });
            }
            break;
          case 'Reddit':
            if (data.Points !== 0) {
              this.socialInfo.push({
                name: data.name,
                followers: data.subscribers,
                url: data.url,
                icon: 'reddit-alien',
                Id: Math.random(),
                fType:'Subscribers',
              });
            }
            break;
          case 'Facebook':
            if (data.Points !== 0) {
              this.socialInfo.push({
                name: data.name,
                followers: data.likes,
                url: data.link,
                icon: 'facebook-f',
                Id: Math.random(),
                fType:'Likes',
              });
            }
            break;
          default:
            break;
        }
    });
  }

  render() {
    return Render.bind(this)(styles, pickerSelectStyles);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  socialsContainer: {
    flexDirection: 'row',
  },
  image: {
    height: 150,
    width: window.width,
    resizeMode: Image.resizeMode.contain,
    marginTop: 4,
    alignSelf: 'center',
  },
  mainText: {
    fontSize: 32,
    fontWeight: '400',
  },
  subText: {
    fontSize: 14,
    fontWeight: '200',
    alignSelf: 'center',
  },
  descriptionText: {
    margin: 8,
    fontSize: 14,
    fontWeight: '100',
    alignContent: 'center',
    justifyContent: 'center',
  },
  headLine: {
    marginTop: 12,
    marginBottom: 12,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  socialList: {
    flex: 1,
    minHeight: 130,
    marginTop: 8,
  },
  picker: {
    height: 50,
    width: 100,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      flex: 1,
      fontSize: 16,
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      borderWidth: 1,
      borderColor: '#424242',
      borderRadius: 2,
      backgroundColor: 'white',
      color: 'black',
  },
});

export default CoinProfile;
