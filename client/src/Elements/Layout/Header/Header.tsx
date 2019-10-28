import React from 'react';
import styled from 'styled-components';

import { spacing } from 'Utilities';
import Container from '../Container';
import Nav from './Nav';
import Logo from './Logo';
import DropdownMenu from './DropdownMenu';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <Wrapper>
      <HeaderContainer>
        <Logo />
        <Nav />
        <DropdownMenu />
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
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  grid-template-areas: 'dropdown logo nav';
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${spacing.xs} 0;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr repeat(2, max-content);
    grid-template-areas: 'logo nav dropdown';
  }
`;
