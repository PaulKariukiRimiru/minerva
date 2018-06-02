import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';

import Header from '../presentation/Header';

const mapStateToProps = (state, ownProps) => ({
  
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch)
}

export class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header}/>
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