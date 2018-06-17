import React from 'react';
import { View, Text, Image, ActivityIndicator, Picker } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { baseImageUrl } from '../../constants/axiosInstance';
import List from '../../presentation/List';

export default function render(styles, pickerSelectStyles) {
  const { navigation, coinAggregate } = this.props;
  const coin = navigation.getParam('coin');
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
            data={this.socialInfo} />
        </View>
        <Text>Select a coin to compare {coin.CoinName} to:</Text>
        <View style={{flex: 1, alignItems: 'center',}}>
          <Picker
            selectedValue={this.state.language}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
        <View style={styles.list}>
          {
            Object.keys(coinAggregate).length > 0 ?
              <List
                view="coinAggregate"
                data={coinAggregate.Exchanges}
                /> :
              <ActivityIndicator size={'large'} color={'#424242'} style={styles.loader} />
          }
        </View>
      </View>
      </ParallaxScrollView>
  );
}
