import React from 'react';
import { useColorScheme } from 'react-native';
import styled from 'styled-components';
import Card from './Card';
import { VERSES } from '../data/verses';

const CardCarousel = ({ verse }) => {
  const theme = useColorScheme();
  const darkMode = theme === 'dark';
  const verses = VERSES;

  return (
    <CardCarouselView
      horizontal
      snapToAlignment='center'
      snapToInterval={400}
      decelerationRate={0}
    >
      <Card verse={verses[0]} />
      <Card verse={verses[1]} />
      <Card verse={verses[2]} />
      <Card verse={verses[3]} />
    </CardCarouselView>
  );
};

const CardCarouselView = styled.ScrollView`
  background-color: #000;
`;

export default CardCarousel;
