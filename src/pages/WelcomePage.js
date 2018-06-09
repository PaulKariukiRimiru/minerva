import React, { Component } from 'react';
import {
  ParallaxSwiper,
  ParallaxSwiperPage
} from 'react-native-parallax-swiper';
import {
  Animated,
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import one from '../images/one.jpg'
import two from '../images/two.jpg'
import three from '../images/three.jpg'
import { Button } from 'react-native-elements';

const { width, height } = Dimensions.get("window");

class WelcomePage extends Component {
  static navigationOptions = {
    header: null
  }

  myCustomAnimatedValue = new Animated.Value(0);

  getPageTransformStyle = index => ({
    transform: [
      {
        scale: this.myCustomAnimatedValue.interpolate({
          inputRange: [
            (index - 1) * (width + 8), // Add 8 for dividerWidth
            index * (width + 8),
            (index + 1) * (width + 8)
          ],
          outputRange: [0, 1, 0],
          extrapolate: "clamp"
        })
      }
    ]
  });

  navigateToApp = () => {
    this.props.navigation.replace('home');
  }

  render() {
    return (
      <ParallaxSwiper
        speed={0.5}
        animatedValue={this.myCustomAnimatedValue}
        dividerWidth={8}
        dividerColor="black"
        backgroundColor="black"
        onMomentumScrollEnd={activePageIndex => console.log(activePageIndex)}
        showProgressBar={true}
        progressBarBackgroundColor="rgba(0,0,0,0.25)"
        progressBarValueBackgroundColor="white"
      >
        <ParallaxSwiperPage
          BackgroundComponent={
            <Image
              style={styles.backgroundImage}
              source={require('../images/one.jpg')}
            />
          }
          ForegroundComponent={
            <View style={styles.foregroundTextContainer}>
              <Animated.Text
                style={[styles.foregroundText, this.getPageTransformStyle(0)]}
              >
                MINERVA
              </Animated.Text>
            </View>
          }
        />
        <ParallaxSwiperPage
          BackgroundComponent={
            <Image
              style={styles.backgroundImage}
              source={require('../images/two.jpg')}
            />
          }
          ForegroundComponent={
            <View style={[styles.foregroundTextContainer, {justifyContent: 'flex-end', marginBottom: 48}]}>
              <Animated.Text
                style={[styles.foregroundText, {fontSize: 24, fontWeight: '400', alignSelf: 'center',}, this.getPageTransformStyle(1)]}
              >
                We keep you connected to the ever changing crypto currency prices.
                All you have to do is tap
              </Animated.Text>
            </View>
          }
        />
        <ParallaxSwiperPage
          BackgroundComponent={
            <Image
              style={styles.backgroundImage}
              source={require('../images/three.jpg')}
            />
          }
          ForegroundComponent={
            <View style={styles.foregroundTextContainer}>
              <Animated.Text
                style={[styles.foregroundText, this.getPageTransformStyle(2)]}
              >
                Try it now...
              </Animated.Text>
              <Button 
                backgroundColor='#ff7043'
                title='Sign up'
                raised={true}
                style={styles.button}
                onPress={this.navigateToApp}
              />
            </View>
          }
        />
      </ParallaxSwiper>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width,
    height,
    resizeMode: Image.resizeMode.fit
  },
  foregroundTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  foregroundText: {
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: 0.41,
    color: "white"
  },
  button: {
    marginTop: 36,
  }
});

export default WelcomePage;
