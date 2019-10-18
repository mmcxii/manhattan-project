import React from 'react';
import styled from 'styled-components';

import { spacing } from 'Utilities';
import Container from '../Container';
import Nav from './Nav';
import Logo from './Logo';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <Wrapper>
      <HeaderContainer>
        <Logo />
        <Nav />
      </HeaderContainer>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  z-index: 5;
`;

const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${spacing.md} 0;

  @media screen and (min-width: 768px) {
    flex-direction: column;
  }
`;
