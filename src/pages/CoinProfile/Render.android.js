import React from 'react';
import { View, Text, Image, ActivityIndicator, Picker } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { baseImageUrl } from '../../constants/axiosInstance';
import List from '../../presentation/List';

export default function render(styles, pickerSelectStyles) {
  const { navigation, coinAggregate, fetchAggregate } = this.props;
  const { loaded } = this.state;
  
  const coin = navigation.getParam('coin');
  let socialList = [];
  socialList =  this.processSocialInfo();
  return (
    <ParallaxScrollView
          renderBackground={
            () => <Image source={{uri: baseImageUrl + coin.ImageUrl}} style={styles.image}/>
          }
          backgroundColor={'#ffffff'}
          parallaxHeaderHeight={180}
        >
      <View style={styles.container}>
        <View style={styles.headLine}>
          <Text style={styles.mainText}>{coin.CoinName}</Text>
          <Text style={styles.subText}>{coin.Name}</Text>
        </View>
        <View style={styles.socialList}>
          <List
            view="coinSocials"
            data={socialList} />
        </View>
        <Text>Select a coin to compare {coin.CoinName} to:</Text>
        <View style={{flex: 1, alignItems: 'center',}}>
          <Picker
            selectedValue={this.state.value}
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
                /> : loaded ? <Text style={styles.sorryMessage}>Sorry we couldnt find data for that combination. Try another :(</Text> :
                  <ActivityIndicator size={'large'} color={'#424242'} style={styles.loader} />
          }
        </View>
      </View>
      </ParallaxScrollView>
  );
}
