import React, { useState, useRef } from 'react';
import { useColorScheme, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import Card from './Card';

const CardCarousel = (props) => {
  const verses = props.verses;
  const window = useWindowDimensions();
  const theme = useColorScheme();
  const darkMode = theme === 'dark';
  const [viewIndex, setViewIndex] = useState(0);
  const scrollView = useRef(null);

  const handleScroll = (event) => {
    const scrollPosition = Math.round(event.nativeEvent.contentOffset.x);
    const contentWidth = Math.round(event.nativeEvent.contentSize.width);
    const index = Math.round((scrollPosition / contentWidth) * verses.length);
    setViewIndex(index);
  };

  const handleRotate = (contentWidth) => {
    const position = (contentWidth * viewIndex) / verses.length;
    scrollView.current.scrollTo({
      x: position,
      y: 0,
      animated: false,
    });
  };

  return (
    <Carousel
      horizontal
      darkMode={darkMode}
      snapToInterval={window.width}
      decelerationRate={'fast'}
      onMomentumScrollEnd={(event) => handleScroll(event)}
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
