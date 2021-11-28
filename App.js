import React from 'react';
import Card from './components/Card';
import CardCarousel from './components/CardCarousel';
import { VERSES } from './data/verses';

export default function App() {
  const verses = VERSES;
  return <Card verse={verses[3]} />;
}
