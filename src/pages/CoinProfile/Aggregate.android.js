import React from 'react';
import { View, Text, ActivityIndicator, Picker } from 'react-native';
import List from '../../presentation/List';
class aggregateComparison extends React.Component{
  render() {
    const { styles, myprops, state, socialInfo } = this.props;
    const { navigation, coinAggregate, fetchAggregate } = myprops;
    const { loaded } = state;
    const coin = navigation.getParam('coin');
    return (
      <View style={styles.container}>
        <View style={styles.socialList}>
          <List
            view="coinSocials"
            data={socialInfo} />
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
  }
};

export default aggregateComparison;
