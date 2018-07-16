import React, { Component } from 'react';
import { StyleSheet, Image, Dimensions, View, Text, ActivityIndicator } from 'react-native';
import AggregateComparison from './Aggregate';
import LiveStream from './LiveStream';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { baseImageUrl, baseSocketUrl } from '../../constants/axiosInstance';
import { TabView, TabBar, PagerExperimental } from 'react-native-tab-view';
import * as GestureHandler from 'react-native-gesture-handler';
import openSocket from 'socket.io-client';

const window = Dimensions.get('window');
class CoinProfile extends Component {
  static navigationOptions = {
    title: 'Profile',
  }

  constructor(props, context) {
    super(props, context);
    this.high = 0;
    this.low = 0;
    this.inputRefs = {};
    this.sub = '';
    this.state = {
      coinPrice: [],
      currentPrice: '',
      loaded: false,
      socialInfo: [],
      selection: 'USD',
      navigationState: {
        index: 0,
        routes: [
          { key: 'comparison', title: 'Comparison' },
          { key: 'liveStream', title: 'LiveStream' },
        ],
      },
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
  }

  componentDidMount(){
    const { navigation, coinProfile,fetchProfile, fetchSocials, fetchAggregate, fetchPriceHistory } = this.props;
    const coin = navigation.getParam('coin');
    fetchAggregate(coin.Name, 'USD', () => {
      fetchProfile(coin.Id, () => {
        fetchSocials(coin.Id, () => {
          fetchPriceHistory(coin.Name, 'USD', Object.keys(coinProfile) > 0 ? coinProfile.aggregate.AggregatedData.MARKET : 'CCCAGG', () => {
            if (Object.keys(coinProfile) > 0 ) {
              const { HIGH24HOUR, LOW24HOUR } = coinProfile.aggregate.AggregatedData;
              this.high = HIGH24HOUR;
              this.low = LOW24HOUR;
            }
            this.processSocialInfo();
            this.setState({
              loaded: true,
            });
          });
        });
      });
    });
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      socialInfo: this.processSocialInfo(nextProps),
    });
  }

  startPriceStream = () => {
    const { coinProfile, navigation } = this.props;
    const coin = navigation.getParam('coin');
    this.socket = openSocket(baseSocketUrl);
    this.sub = '2~' + 'LocalBitcoins' + '~' + coin.Name + '~USD';
    console.log('sub', this.sub)
    this.socket.on('m', resp => this.updateCoinStatus(resp));
    this.socket.emit('SubAdd', { subs:  [this.sub] } );
  }

  stopPriceStream = () => {
    this.socket.emit('SubRemove', { subs: [this.sub] } );
    this.socket.close();
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
              x: priceSnapshot.Price,
              y: new Date(),
            }),
          currentPrice: priceSnapshot.Price,
          loaded: true,
        });
      }
    }
  }

  processSocialInfo = (props) => {
    const { coinSocials } = this.props;
    let myList = [];
    Object.keys(coinSocials).length > 0 &&
      Object.keys(coinSocials).map((dataKey, index) => {
        const data = coinSocials[dataKey];
        if (data.Points !== 0) {
          switch (dataKey) {
            case 'CryptoCompare':
              myList.push({
                    name: dataKey,
                    followers: data.Followers,
                    url: '',
                    icon: 'home',
                    Id: Math.random(),
                    fType:'Followers',
                  });
              break;
            case 'Twitter':
                myList.push({
                    name: data.name,
                    followers: data.followers,
                    url: data.link,
                    icon: 'twitter',
                    Id: Math.random(),
                    fType:'Followers',
                  });
              break;
            case 'Reddit':
              myList.push({
                    name: data.name,
                    followers: data.subscribers,
                    url: data.url,
                    icon: 'reddit-alien',
                    Id: Math.random(),
                    fType:'Subscribers',
                  });
              break;
            case 'Facebook':
              myList.push({
                    name: data.name,
                    followers: data.likes,
                    url: data.link,
                    icon: 'facebook-f',
                    Id: Math.random(),
                    fType:'Likes',
                  });
              break;
            default:
              break;
          }
        }
    });
    return myList;
  };

  addOrReplace = (array, priceItem) => {
    const i = array.findIndex(item => item.currency === priceItem.currency);
    if (i > -1) {array[i] = priceItem;}
    else {array.push(priceItem);}

    return array;
  }

  onValueChange = (value) => {
    const { navigation, fetchAggregate } = this.props;
    const coin = navigation.getParam('coin');

    fetchAggregate(coin.Name, value, () => {});
    this.setState({
        selection: value,
    });
  }

  renderScene = ({ route }) => {
    const { coinHistory } = this.props;
    switch (route.key) {
    case 'comparison':
      return <AggregateComparison
                state={this.state}
                myprops={this.props}
                styles={styles}
                pickerSelectStyles={pickerSelectStyles}
                onValueChange={this.onValueChange}
                downArrow={this.downArrow}
                upArrow={this.upArrow}
                ref={this.ref}
                socialInfo={this.state.socialInfo}
                />;
    case 'liveStream':
      return <LiveStream
                data={this.state.coinPrice}
                high={this.high}
                low={this.low}
                from={coinHistory.from}
                to={coinHistory.to}
                startStream={this.startPriceStream}
                stopStream={this.stopPriceStream}
                currentPrice={this.state.currentPrice}
                />;
    default:
      return null;
    }
  }
  downArrow = () => { this.inputRefs.picker2.togglePicker(); }

  upArrow = () => { this.inputRefs.name.focus(); }

  ref = (el) => { this.inputRefs.picker = el; }

  renderTabBar = props => (
    <TabBar
      {...props}
      style={styles.tab}
      pressColor={'#e7e7e7'}
      labelStyle={styles.tabLabel}
      indicatorStyle={styles.indicator}
      canJumpToTab={() => true}
      useNativeDriver
    />
  );

  renderPage = props => <PagerExperimental {...props} GestureHandler={GestureHandler} />;

  indexChange = index => this.setState({ navigationState: { ...this.state.navigationState, index } })

  render() {
    const { navigation } = this.props;
    const { navigationState, loaded } = this.state;
    const coin = navigation.getParam('coin');

    return (
      <View style={styles.container}>
        { loaded ?
          <ParallaxScrollView
            renderBackground={
              () => <Image source={{uri: baseImageUrl + coin.ImageUrl}} style={styles.image}/>
            }
            backgroundColor={'#ffffff'}
            parallaxHeaderHeight={180}>
            <View style={styles.headLine}>
              <Text style={styles.mainText}>{coin.CoinName}</Text>
              <Text style={styles.subText}>{coin.Name}</Text>
            </View>
            <TabView
              style={styles.tabView}
              navigationState={navigationState}
              renderScene={this.renderScene}
              onIndexChange={this.indexChange}
              initialLayout={{ height: 0, width: Dimensions.get('window').width }}
              renderTabBar={this.renderTabBar}
              renderPager={this.renderPage}
              useNativeDriver
            />
          </ParallaxScrollView>
          :
          <ActivityIndicator size="large" color="#424242" style={styles.loader}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: 1,
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
    alignSelf: 'center',
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
    marginTop: 4,
    marginBottom: 4,
  },
  sorryMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: 20,
  },
  tab: {
    backgroundColor: '#FFFFFF',
  },
  tabLabel: {
    color: '#424242',
  },
  indicator: {
    backgroundColor: '#424242',
  },
  tabView: {
    flex: 1,
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
      marginTop: 4,
      marginBottom: 4,
      width: 150,
  },
});

export default CoinProfile;
