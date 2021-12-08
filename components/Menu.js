import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

const Menu = () => {
  return (
    <SafeAreaView>
      <MenuContainer>
        <Title>Scripture Memory</Title>
      </MenuContainer>
    </SafeAreaView>
  );
};

const MenuContainer = styled.View`
  background-color: #000;
  height: 50px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

export default Menu;
