import React, { Component } from 'react';
import { StyleSheet, Image, Dimensions, View, Text } from 'react-native';
import AggregateComparison from './Aggregate';
import LiveStream from './LiveStream';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { baseImageUrl } from '../../constants/axiosInstance';
import { TabView, TabBar, PagerExperimental } from 'react-native-tab-view';
import * as GestureHandler from 'react-native-gesture-handler';

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
    //this.socket = openSocket(baseSocketUrl);
  }

  componentDidMount(){
    const { navigation, fetchProfile, fetchSocials, fetchAggregate } = this.props;
    const coin = navigation.getParam('coin');
    fetchAggregate(coin.Name, 'USD', () => {
      fetchProfile(coin.Id, () => {
        fetchSocials(coin.Id, () => {
          //const { coinProfile } = this.props;
          this.processSocialInfo();
          this.setState({
            loaded: true,
          });
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

  onValueChange = (value) => {
    const { navigation, fetchAggregate } = this.props;
    const coin = navigation.getParam('coin');

    fetchAggregate(coin.Name, value, () => {});
    this.setState({
        selection: value,
    });
  }

  renderScene = ({ route }) => {
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
                />;
    case 'liveStream':
      return <LiveStream />;
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
      bounces={true}
      indicatorStyle={styles.indicator}
      useNativeDriver
    />
  );

  renderPage = props => <PagerExperimental {...props} GestureHandler={GestureHandler} />;

  indexChange = index => this.setState({ navigationState: { ...this.state.navigationState, index } })

  render() {
    const { navigation } = this.props;
    const { navigationState } = this.state;
    const coin = navigation.getParam('coin');

    return (
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
            navigationState={navigationState}
            renderScene={this.renderScene}
            onIndexChange={this.indexChange}
            initialLayout={{ height: 0, width: Dimensions.get('window').width }}
            renderTabBar={this.renderTabBar}
            renderPager={this.renderPage}
          />
      </ParallaxScrollView>
    );
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
