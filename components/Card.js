import React, { useRef, useState } from 'react';
import {
  Animated,
  useColorScheme,
  useWindowDimensions,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';

const Card = ({ verse }) => {
  const theme = useColorScheme();
  const darkMode = theme === 'dark';
  const platform = Platform.OS;
  const window = useWindowDimensions();
  const orientation = window.width > window.height ? 'landscape' : 'portrait';
  const rotation = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => {
    const toValue = flipped ? 0 : 1;
    Animated.timing(rotation, {
      toValue: toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setFlipped(!flipped);
  };

  const setTransformStyle = (cardSide) => {
    const outputRange =
      cardSide == 'back' ? ['-180deg', '0deg'] : ['0deg', '180deg'];
    return {
      transform: [
        { perspective: 800 },
        {
          rotateY: rotation.interpolate({
            inputRange: [0, 1],
            outputRange: outputRange,
          }),
        },
      ],
    };
  };

  const convertTagstoString = (tags) => {
    let tagString = '';
    tags.forEach((tag) => {
      tagString += `#${tag} `;
    });
    return tagString.slice(0, -1);
  };

  return (
    <ViewContainer
      darkMode={darkMode}
      screenWidth={window.width}
      screenHeight={window.height}
    >
      <CardContainer
        darkMode={darkMode}
        orientation={orientation}
        onStartShouldSetResponder={() => true}
        onStartShouldSetResponderCapture={() => true}
        onResponderRelease={flipCard}
        style={
          platform === 'web' ? { cursor: 'pointer', userSelect: 'none' } : {}
        }
      >
        <CardFront darkMode={darkMode} style={setTransformStyle('front')}>
          <CardFront__VerseNumber darkMode={darkMode}>
            {verse.verseNumber}
          </CardFront__VerseNumber>
        </CardFront>
        <CardBack darkMode={darkMode} style={setTransformStyle('back')}>
          <CardBack__VerseNumber darkMode={darkMode}>
            {verse.verseNumber}
          </CardBack__VerseNumber>
          <CardBack__VerseTextContainer>
            <CardBack__VerseText darkMode={darkMode}>
              {verse.verseText}
            </CardBack__VerseText>
          </CardBack__VerseTextContainer>
          <CardBack__VerseTags darkMode={darkMode}>
            {convertTagstoString(verse.verseTags)}
          </CardBack__VerseTags>
        </CardBack>
      </CardContainer>
    </ViewContainer>
  );
};

const ViewContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: ${({ screenWidth }) => screenWidth}px;
  height: ${({ screenHeight }) => screenHeight}px;
`;

const CardContainer = styled(Animated.View)`
  width: ${(props) => (props.orientation === 'portrait' ? '90%' : '75%')};
  height: ${(props) => (props.orientation === 'portrait' ? '70%' : '80%')};
  max-width: 600px;
  max-height: 700px;
  justify-content: center;
  align-items: center;
`;

const BasicCard = styled(Animated.View)`
  width: 100%;
  height: 100%;
  position: absolute;
  align-items: center;
  background-color: ${(props) =>
    props.darkMode ? 'rgba(255, 255, 255, 0.1)' : '#f5fcff'};
  padding: 7%;
  border-radius: 15px;
  box-shadow: ${(props) =>
    props.darkMode
      ? '0 5px 15px rgba(0, 0, 0, 1)'
      : '0 5px 15px rgba(0, 0, 0, 0.5)'};
  backface-visibility: hidden;
`;

const CardFront = styled(BasicCard)`
  justify-content: center;
`;

const CardBack = styled(BasicCard)`
  justify-content: space-between;
  transform: rotateY(180deg);
`;

const CardFront__VerseNumber = styled.Text`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: ${(props) =>
    props.darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
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
  font-size: 25px;
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
