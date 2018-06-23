import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import List from '../../presentation/List';
import RNPickerSelect from 'react-native-picker-select';

class aggregateComparison extends React.Component {
  render() {

    const { styles, myprops, state, pickerSelectStyles, downArrow, upArrow, myref, onValueChange, socialInfo } = this.props;
    const { navigation, coinAggregate } = myprops;
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
  }
};

export default aggregateComparison;
