import React, { useRef } from 'react';
import { useColorScheme } from 'react-native';
import styled from 'styled-components';
import CardFlip from './CardFlip';

const Card = ({ verse }) => {
  const theme = useColorScheme();
  const darkMode = theme === 'dark';
  const cardFlip = useRef(null);
  const handlePress = () => {
    cardFlip.current.flipCard();
  };

  return (
    <CardContainer darkMode={darkMode} ref={cardFlip}>
      <CardFront darkMode={darkMode} onPress={handlePress}>
        <CardFront__VerseNumber darkMode={darkMode}>
          {verse.verseNumber + ' ' + verse.translation}
        </CardFront__VerseNumber>
      </CardFront>
      <CardBack darkMode={darkMode} onPress={handlePress}>
        <CardBack__VerseContainer darkMode={darkMode}>
          <CardBack__VerseText darkMode={darkMode}>
            {verse.verseText}
          </CardBack__VerseText>
          <CardBack__VerseNumber darkMode={darkMode}>
            {verse.verseNumber}
          </CardBack__VerseNumber>
        </CardBack__VerseContainer>
        <CardBack__VerseTags darkMode={darkMode}>
          {verse.verseTags}
        </CardBack__VerseTags>
      </CardBack>
    </CardContainer>
  );
};

const CardContainer = styled(CardFlip)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.darkMode ? '#121212' : '#f5fcff')};
`;

const BasicCard = styled.Pressable`
  position: absolute;
  width: 90%;
  height: 70%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.darkMode ? '#121212' : '#f5fcff')};
  padding: 20px;
  border-radius: 15px;
  border: ${(props) =>
    props.darkMode ? '2px solid rgba(255, 255, 255, 0.05)' : 'none'};
  box-shadow: ${(props) =>
    props.darkMode
      ? '0 5px 15px rgba(0, 0, 0, 1)'
      : '0 5px 15px rgba(0, 0, 0, 0.5)'};
  backface-visibility: hidden;
`;

const CardFront = styled(BasicCard)`
  /* transform: rotateY(180deg); */
`;

const CardFront__VerseNumber = styled.Text`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: ${(props) =>
    props.darkMode ? '#rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
`;

const CardBack = styled(BasicCard)`
  justify-content: space-between;
  /* transform: rotateY(180deg); */
`;

const CardBack__VerseContainer = styled.View`
  height: 90%;
  justify-content: center;
`;

const CardBack__VerseText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  text-align: justify;
  color: ${(props) =>
    props.darkMode ? '#rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
  margin-bottom: 30px;
`;

const CardBack__VerseNumber = styled.Text`
  font-size: 20px;
  text-align: center;
  color: ${(props) =>
    props.darkMode ? '#rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
`;

const CardBack__VerseTags = styled.Text`
  font-size: 18px;
  text-align: center;
  color: ${(props) =>
    props.darkMode ? '#rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
`;

export default Card;
