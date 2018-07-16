import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { VictoryArea } from 'victory-native';
class liveStream extends React.Component {

  componentDidMount() {
    this.props.startStream();
  }

  componentWillUnmount() {
    this.props.stopStream();
  }

  render () {
    const { data, currency, currentPrice } = this.props;
    return (
      <View style={styles.container}>
        <Text>{currency} {currentPrice}</Text>
        <VictoryArea
          style={{
            data: { strokeWidth: 2, fillOpacity: 0.4, fill: "#e7e7e7", stroke: "#424242" }
          }}
          width={Dimensions.get('window').width}
          height={500}
          interpolation="natural"
          data={data}
          padding={0}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

export default liveStream;
