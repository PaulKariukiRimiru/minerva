import React, { Component } from 'react'
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem} from 'react-native-elements';
import { baseImageUrl } from '../constants/axiosInstance';

export default class MyList extends Component {

  renderItem = (coin) => {
    return (
      <ListItem 
        avatar={baseImageUrl+coin.item.ImageUrl}
        title={coin.item.CoinName}
        subtitle={coin.item.Name}
        onPress={() => this.props.onCoinSelected(coin)}
      />
    )
  }

  refreshData = () => {
    this.props.refreshData()
  }

  render() {
    const { data } = this.props
    return (
      <FlatList
        data={data}
        refreshing={false}
        onRefresh={this.refreshData}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => item.Id}
      />
    )
  }
}
