import React, { useRef } from 'react';
import { useColorScheme, useWindowDimensions } from 'react-native';
import styled from 'styled-components';
import CardFlip from './CardFlip';

const Card = ({ verse }) => {
  const window = useWindowDimensions();
  const theme = useColorScheme();
  const darkMode = theme === 'dark';
  const cardFlip = useRef(null);
  const handlePress = () => {
    cardFlip.current.flipCard();
  };

  return (
    <ViewContainer
      darkMode={darkMode}
      screenWidth={window.width}
      screenHeight={window.height}
    >
      <CardContainer darkMode={darkMode} ref={cardFlip}>
        <CardFront darkMode={darkMode} activeOpacity={1} onPress={handlePress}>
          <CardFront__VerseNumber darkMode={darkMode}>
            {verse.verseNumber}
          </CardFront__VerseNumber>
        </CardFront>
        <CardBack darkMode={darkMode} activeOpacity={1} onPress={handlePress}>
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
  width: ${({ screenWidth }) => screenWidth}px;
  height: ${({ screenHeight }) => screenHeight}px;
  background-color: ${({ darkMode }) => (darkMode ? '#121212' : '#f5fcff')};
`;

const CardContainer = styled(CardFlip)`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const BasicCard = styled.TouchableOpacity`
  width: 90%;
  height: 85%;
  max-width: 600px;
  max-height: 800px;
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
