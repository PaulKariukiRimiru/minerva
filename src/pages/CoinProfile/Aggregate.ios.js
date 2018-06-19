import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import List from '../../presentation/List';
import RNPickerSelect from 'react-native-picker-select';

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
  const { styles, myprops, state, pickerSelectStyles, downArrow, upArrow, myref, onValueChange } = props;
  const { navigation, coinAggregate } = myprops;
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
      <View style={{flex: 1, alignItems: 'center',}}>
      <RNPickerSelect
            placeholder={{
                label: 'Select a currency or coin',
                value: null,
            }}
            items={state.items}
            onValueChange={onValueChange}
            onUpArrow={upArrow}
            onDownArrow={downArrow}
            value={state.selection}
            ref={myref}
            style={{...pickerSelectStyles}}
          />
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
