import React from 'react';
import styled from 'styled-components';

import { spacing } from 'Utilities';
import Container from '../Container';
import Nav from './Nav';
import Logo from './Logo';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <HeaderContainer>
      <Logo />
      <Nav />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled(Container).attrs({ as: 'header' })`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: ${spacing.md} 0;
`;
