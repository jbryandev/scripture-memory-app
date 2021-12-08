import React from 'react';
import { SafeAreaView } from 'react-native';
import { useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import CardCarousel from './components/CardCarousel';
import Menu from './components/Menu';
import { VERSES } from './data/verses';

export default function App() {
  const theme = useColorScheme();
  const darkMode = theme === 'dark';

  return (
    <Container darkMode={darkMode}>
      <Menu />
      <CardCarousel verses={VERSES} />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${({ darkMode }) => (darkMode ? '#121212' : '#f5fcff')};
`;
