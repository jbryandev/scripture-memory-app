import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import Card from './Card';
import { VERSES } from '../data/verses';
import Carousel from 'react-native-snap-carousel';

class CardCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      verses: VERSES,
    };
  }

  _renderItem = ({ verses, index }) => {
    return <Card verse={verses[index]} />;
  };

  render() {
    return (
      <SafeAreaView>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={this.state.verses}
          renderItem={this._renderItem}
          sliderWidth={400}
          itemWidth={300}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
          inactiveSlideScale={0.95}
          inactiveSlideOpacity={0.7}
          firstItem={this.state.activeSlide}
        />
        <Text>{this.state.activeSlide}</Text>
      </SafeAreaView>
    );
  }
}

export default CardCarousel;
