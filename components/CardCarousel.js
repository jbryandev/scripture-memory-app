import React, { useState, useRef } from 'react';
import { useColorScheme, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import Card from './Card';
import { VERSES } from '../data/verses';

const CardCarousel = (props) => {
  const window = useWindowDimensions();
  const theme = useColorScheme();
  const darkMode = theme === 'dark';
  const verses = VERSES;
  const [scrollX, setScrollX] = useState(0);
  const [viewIndex, setViewIndex] = useState(0);
  const scrollView = useRef(null);

  const handleScrollEnd = (event) => {
    const scrollPosition = Math.round(event.nativeEvent.contentOffset.x);
    const contentWidth = Math.round(event.nativeEvent.contentSize.width);
    const index = Math.round((scrollPosition / contentWidth) * verses.length);
    setScrollX(scrollPosition);
    setViewIndex(index);
  };

  const handleRotate = (contentWidth) => {
    const position = (contentWidth * viewIndex) / verses.length;
    scrollView.current.scrollTo({
      x: position,
      y: 0,
      animated: true,
    });
  };

  return (
    <Carousel
      horizontal
      darkMode={darkMode}
      snapToAlignment='center'
      snapToInterval={window.width}
      decelerationRate={'fast'}
      onMomentumScrollEnd={(event) => handleScrollEnd(event)}
      onContentSizeChange={(contentWidth) => handleRotate(contentWidth)}
      ref={(ref) => (scrollView.current = ref)}
    >
      {verses.map((verse, index) => (
        <Card key={index} verse={verse} index={index} />
      ))}
    </Carousel>
  );
};

const Carousel = styled.ScrollView`
  background-color: ${({ darkMode }) => (darkMode ? '#121212' : '#f5fcff')};
`;

export default CardCarousel;
