import React from 'react';
import { View, Text, ActivityIndicator, Picker } from 'react-native';
import List from '../../presentation/List';

const processSocialInfo = (props) => {
  const { coinSocials } = props;
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

const aggregateComparison = (props) => {
  const { styles, myprops, state } = props;
  const { navigation, coinAggregate, fetchAggregate } = myprops;
  const { loaded } = state;

  const coin = navigation.getParam('coin');
  let socialList = [];

  socialList =  processSocialInfo(myprops);
  return (
    <View style={styles.container}>
      <View style={styles.socialList}>
        <List
          view="coinSocials"
          data={socialList} />
      </View>
      <Text>Select a coin to compare {coin.CoinName} to:</Text>
      <View style={{ flex: 1, alignItems: 'center', }}>
        <Picker
          selectedValue={state.value}
          style={{ height: 50, width: 300 }}
          onValueChange={(itemValue, itemIndex) => {
            fetchAggregate(coin.Name, itemValue, () => {});
            this.setState({
                value: itemValue,
            });
            }
          }>
          <Picker.Item label="US Dollar" value="USD" />
          <Picker.Item label="Bitcoin" value="BTC" />
          <Picker.Item label="Etherium" value="ETH" />
          <Picker.Item label="Litcoin" value="LTC" />
          <Picker.Item label="DigitalCash" value="DASH" />
        </Picker>
      </View>
      <View style={styles.list}>
        {
          Object.keys(coinAggregate).length > 0 ?
            <List
              view="coinAggregate"
              data={coinAggregate.Exchanges}
              />
              : loaded ? <Text style={styles.sorryMessage}>Sorry we couldnt find data for that combination. Try another :(</Text> :
            <ActivityIndicator size={'large'} color={'#424242'} style={styles.loader} />
        }
      </View>
    </View>
  );
};

export default aggregateComparison;
