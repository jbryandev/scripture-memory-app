import React, { Component } from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';

class CardFlip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      front: true,
      rotation: new Animated.Value(0),
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
    Dimensions.addEventListener('change', (e) => {
      const { width, height } = e.window;
      this.setState({ width, height });
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  flipCard = () => {
    const { front, rotation } = this.state;
    const toValue = front ? 180 : 0;
    Animated.timing(rotation, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
    this.setState({ front: !front });
  };

  render() {
    const { rotation } = this.state;
    const { width, height } = this.state;
    const frontAnimatedStyle = {
      transform: [
        {
          perspective: 800,
        },
        {
          rotateY: rotation.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
          }),
        },
      ],
    };
    const backAnimatedStyle = {
      transform: [
        {
          perspective: -800,
        },
        {
          rotateY: rotation.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '0deg'],
          }),
        },
      ],
    };
    return (
      <Animated.View style={this.props.style}>
        <Animated.View
          style={[
            styles.container,
            frontAnimatedStyle,
            { width: width, height: height },
          ]}
        >
          {this.props.children[0]}
        </Animated.View>
        <Animated.View
          style={[
            styles.container,
            backAnimatedStyle,
            { width: width, height: height },
          ]}
        >
          {this.props.children[1]}
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
});

export default CardFlip;
