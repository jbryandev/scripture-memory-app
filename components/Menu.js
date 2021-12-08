import React from 'react';
import { Button, SafeAreaView, useColorScheme } from 'react-native';
import styled from 'styled-components/native';

const Menu = () => {
  const theme = useColorScheme();
  const darkMode = theme === 'dark';

  return (
    <SafeAreaView>
      <MenuContainer darkMode={darkMode}>
        <Title darkMode={darkMode}>Scripture Memory App</Title>
        {/* <Button title='Menu' /> */}
      </MenuContainer>
    </SafeAreaView>
  );
};

const MenuContainer = styled.View`
  padding: 1%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ darkMode }) => (darkMode ? '#121212' : '#f5fcff')};
  border-bottom-width: 1px;
  border-bottom-color: ${({ darkMode }) => (darkMode ? '#D4D4D4' : '#D4D4D4')};
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) =>
    props.darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
`;

export default Menu;
