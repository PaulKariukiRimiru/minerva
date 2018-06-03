import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';
import {
  coinListFetch
} from '../actions/coin';

import Header from '../presentation/Header';
import List from '../presentation/List';

const mapStateToProps = (state, ownProps) => ({
  coin: state.coin
})

const mapDispatchToProps = (dispatch) => ({
  fetchCoinList: (callBack) => {
    dispatch(coinListFetch(callBack))
  }
});

class Home extends Component {

  componentDidMount() {
    const { coinActions, dispatch } = this.props; 
    this.props.fetchCoinList(() => {
      console.log('fetched');
    })
  }

  render() {
    const { coin } = this.props;
    return (
      <View style={styles.container}>
        <Header style={styles.header}/>
        <List data={coin.coinList} />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)