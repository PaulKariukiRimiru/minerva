import React, { Component } from 'react'
import { View, FlatList, StyleSheet } from 'react-native';
import ListItem from '../presentation/ListItem';
import { baseImageUrl } from '../constants/axiosInstance';

export default class MyList extends Component {

  onPress = (coin) => {
    this.props.onCoinSelected(coin)
  }

  renderItem = (coin) => {
    return (
      <ListItem 
        coin={coin.item}
        onPress={this.onPress}
        initialNumToRender={20}
        getItemLayout={(data, index) => (
          {length: 60, offset: 60 * index, index}
        )}
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
        removeClippedSubviews={true}
        maxToRenderPerBatch={1000}
        updateCellsBatchingPeriod={500}
        onRefresh={this.refreshData}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => item.Id}
        getItemLayout={(data, index) => {
          return ({
            length: 70,
            offset: 70 * index,
            index
          })
        }}
      />
    )
  }
}
