import React, { useRef, useState } from 'react';
import { Animated, useColorScheme, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

const Card = ({ verse }) => {
  const window = useWindowDimensions();
  const theme = useColorScheme();
  const darkMode = theme === 'dark';
  const rotation = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);

  const flip = () => {
    console.log('called');
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
    <ViewContainer
      darkMode={darkMode}
      screenWidth={window.width}
      screenHeight={window.height}
    >
      <CardContainer darkMode={darkMode}>
        <CardFront
          darkMode={darkMode}
          onStartShouldSetResponder={() => true}
          onStartShouldSetResponderCapture={() => true}
          onResponderRelease={flip}
          style={{ frontAnimatedStyle }}
        >
          <CardFront__VerseNumber darkMode={darkMode}>
            {verse.verseNumber}
          </CardFront__VerseNumber>
        </CardFront>
        <CardBack
          darkMode={darkMode}
          onStartShouldSetResponder={() => true}
          onStartShouldSetResponderCapture={() => true}
          onResponderRelease={flip}
          style={{ backAnimatedStyle }}
        >
          <CardBack__VerseNumber darkMode={darkMode}>
            {verse.verseNumber}
          </CardBack__VerseNumber>
          <CardBack__VerseTextContainer>
            <CardBack__VerseText darkMode={darkMode}>
              {verse.verseText}
            </CardBack__VerseText>
          </CardBack__VerseTextContainer>
          <CardBack__VerseTags darkMode={darkMode}>
            {verse.verseTags}
          </CardBack__VerseTags>
        </CardBack>
      </CardContainer>
    </ViewContainer>
  );
};

const ViewContainer = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: ${({ screenWidth }) => screenWidth}px;
  height: ${({ screenHeight }) => screenHeight}px;
`;

const CardContainer = styled(Animated.View)`
  width: 90%;
  height: 85%;
  justify-content: center;
  align-items: center;
`;

const BasicCard = styled(Animated.View)`
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 800px;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.darkMode ? 'rgba(255, 255, 255, 0.1)' : '#f5fcff'};
  padding: 20px;
  border-radius: 15px;
  box-shadow: ${(props) =>
    props.darkMode
      ? '0 5px 15px rgba(0, 0, 0, 1)'
      : '0 5px 15px rgba(0, 0, 0, 0.5)'};
  backface-visibility: hidden;
`;

const CardFront = styled(BasicCard)``;

const CardFront__VerseNumber = styled.Text`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: ${(props) =>
    props.darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
`;

const CardBack = styled(BasicCard)`
  justify-content: space-between;
`;

const CardBack__VerseNumber = styled.Text`
  padding-bottom: 10px;
  font-size: 18px;
  text-align: center;
  color: ${(props) =>
    props.darkMode ? '#rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
`;

const CardBack__VerseTextContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CardBack__VerseText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: justify;
  color: ${(props) =>
    props.darkMode ? '#rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
`;

const CardBack__VerseTags = styled.Text`
  padding-top: 10px;
  font-size: 18px;
  text-align: center;
  color: ${(props) =>
    props.darkMode ? '#rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
`;

export default Card;
