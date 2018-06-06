import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';

import { connect } from 'react-redux';
import {
  coinListFetch
} from '../actions/coin';

import Header from '../presentation/Header';
import List from '../presentation/List';
import { SearchBar } from 'react-native-elements';

const mapStateToProps = (state, ownProps) => ({
  coin: state.coin
})

const mapDispatchToProps = (dispatch) => ({
  fetchCoinList: (callBack) => {
    dispatch(coinListFetch(callBack))
  }
});


class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      coins: {}
    }
  }
  static navigationOptions = {
    drawerLabel: 'Home'
  };

  componentDidMount() {
    const { coinActions, dispatch } = this.props; 
    this.props.fetchCoinList(() => {
      this.setState({ coins: this.props.coin.coinList })
    })
  }

  refreshPage = () => {
    this.props.fetchCoinList(() => {
      this.setState({ coins: this.props.coin.coinList })
    })
  }

  onSearchChange = (text) => {
    const { coinList } = this.props.coin;
    this.setState({
      coins: coinList.filter((coin) => coin.CoinName.includes(text))
    })
  }

  onClearSearch = () => {
    this.setState({ coins: this.props.coin.coinList })
  }

  onCoinSelected = (coin) => {
    this.props.navigation.navigate('coinProfile',{ coin })
  }

  render() {
    const { coins } = this.state;
    return (
      <View style={styles.container}>
        <SearchBar
          containerStyle={{backgroundColor: '#424242'}}
          onChangeText={this.onSearchChange}
          onClearText={this.onClearSearch}
          icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Type Here...' />
          {
            (coins && coins.length > 0) ?
            <List
              onCoinSelected={this.onCoinSelected} 
              data={coins} 
              refreshData={this.refreshPage}
              />
            :
            <ActivityIndicator size="large" color="#424242" style={styles.loader}/>
          }
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)