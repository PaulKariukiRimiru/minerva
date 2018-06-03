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
        key={coin.item.Id}
        keyExtractor={(coin, index) => coin.item.Id }
      />
    )
  }

  render() {
    const { data } = this.props
    return (
      <FlatList
        data={data}
        onRefresh={this.refreshData}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => item.index }
      />
    )
  }
}
