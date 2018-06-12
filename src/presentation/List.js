import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ListItem from '../presentation/ListItem';

export default class MyList extends Component {

  state = {
    refresh: false,
  }

  onPress = (coin) => {
    this.props.onCoinSelected(coin);
  }

  renderItem = (coin) => {
    return (
      <ListItem
        coin={coin.item}
        view={this.props.view}
        onPress={this.onPress}
        initialNumToRender={20}
        getItemLayout={(data, index) => (
          {length: 60, offset: 60 * index, index}
        )}
      />
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        refresh: !this.state.refresh,
      });
    }
  }

  refreshData = () => {
    this.props.refreshData();
  }

  render() {
    const { data } = this.props;
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
        extraData={this.state.refresh}
        getItemLayout={(mydata, index) => {
          return ({
            length: 70,
            offset: 70 * index,
            index,
          });
        }}
      />
    );
  }
}
