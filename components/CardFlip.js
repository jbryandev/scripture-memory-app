import React, { useRef, useState } from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

const CardFlip = (props) => {
  const { width, height } = useWindowDimensions();
  const rotation = useRef(new Animated.Value(0)).current;
  const [front, back] = props.children;
  const [flipped, setFlipped] = useState(false);

  const flip = () => {
    const toValue = flipped ? 0 : 1;
    Animated.timing(rotation, {
      toValue: toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setFlipped(!flipped);
  };

  const frontAnimatedStyle = {
    transform: [
      { perspective: 800 },
      {
        rotateY: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      { perspective: -800 },
      {
        rotateY: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['180deg', '0deg'],
        }),
      },
    ],
  };

  return (
    <SafeAreaView style={[styles.container, { width: width, height: height }]}>
      <Animated.View
        style={styles.cardContainer}
        onStartShouldSetResponder={() => true}
        onStartShouldSetResponderCapture={() => true}
        onResponderRelease={flip}
      >
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          {front}
        </Animated.View>
        <Animated.View style={[styles.card, backAnimatedStyle]}>
          {back}
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '90%',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backfaceVisibility: 'hidden',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardFlip;
