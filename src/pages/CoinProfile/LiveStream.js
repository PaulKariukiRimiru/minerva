import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import { VictoryArea } from 'victory-native';
class liveStream extends React.Component {
  render () {
    const { data, high, low, from, to, currency, price } = this.props;
    return (
      <View>
        <Text>{currency} {price}</Text>
        <VictoryArea
          style={{
            data: { strokeWidth: 2, fillOpacity: 0.4, fill: "#e7e7e7", stroke: "#424242" }
          }}
          width={Dimensions.get('window').width}
          height={400}
          interpolation="natural"
          data={data}
          padding={0}
        />
      </View>
    );
  }
}

export default liveStream;
