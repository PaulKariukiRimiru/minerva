import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Header, Icon, Text } from 'react-native-elements';

export default class MyHeader extends Component {
  renderLeftComponent = () => (
    <Icon name='menu' color='#FFFFFF' size={24}/>
  );
  renderCenterComponent = () => (
    <Text style={[styles.container, styles.headerText]}>Minerva</Text>
  );
  
  renderRightComponent = () => (
    <Icon name='more-vert' color='#FFFFFF' size={24}/>
  );
  
  render() {
    return (
      <Header
        leftComponent={this.renderLeftComponent()}
        centerComponent={this.renderCenterComponent()}
        rightComponent={this.renderRightComponent()}
        backgroundColor='#424242'
        outerContainerStyles={{height: 80, padding: 10, justifyContent: 'center'}}
      />
    );
  };
};
const styles = StyleSheet.create({
  container:{
    color: '#ffffff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '300',
  },
});
