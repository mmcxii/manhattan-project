import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from 'Store';
import { white, spacing, transition, absolute, red, fadeIn, fadeOut, black, grey } from 'Utilities';
import NavItem from './NavItem';

interface Props {}

const Nav: React.FC<Props> = () => {
  const { theme } = useContext(ThemeContext);
  const [navIsOpen, setNavIsOpen] = useState<boolean>(false);
  const navItems: { page: string; link: string; icon: string }[] = [
    {
      page: 'search',
      link: '/',
      icon: 'far fa-search',
    },
    {
      page: 'profile',
      // TODO: make route dynamically read username
      link: '/user/nichsecord',
      icon: 'far fa-user',
    },
    {
      page: 'about the team',
      link: '/about',
      icon: 'far fa-glass-martini-alt',
    },
  ];

  const toggleNav = () => setNavIsOpen(!navIsOpen);

  return (
    <Navbar>
      <ToggleNavButton onClick={toggleNav}>
        <Hamburger toggle={navIsOpen} theme={theme} />
      </ToggleNavButton>

      <NavList toggle={navIsOpen} theme={theme}>
        {navItems.map(item => (
          <NavItem key={item.page} {...item} hideNav={toggleNav} theme={theme} />
        ))}
      </NavList>
    </Navbar>
  );
};

export default Nav;

const Navbar = styled.nav`
  padding: ${spacing.md} 0;
  text-transform: capitalize;
`;

const NavList = styled.ul<{ toggle: boolean; theme: string }>`
  ${absolute({})};
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background: ${red};
  visibility: ${props => (props.toggle ? 'visable' : 'hidden')};
  animation: 100ms linear ${props => (props.toggle ? fadeIn : fadeOut)};
  list-style: none;

  @media screen and (min-width: 768px) {
    visibility: initial;
    height: initial;
    flex-direction: row;
    justify-content: center;
    position: initial;
    background: initial;
  }
`;

const ToggleNavButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  padding: ${spacing.lg};
  ${absolute({ x: 'right' })};
  z-index: 2;
`;

const Hamburger = styled.span<{ toggle: boolean; theme: 'dark' | 'light' }>`
  display: block;
  position: relative;
  height: 2px;
  width: 1.5rem;
  background: ${props => (props.theme === 'dark' ? white : props => (props.toggle ? white : black))};

  ${transition({ prop: 'transform' })};
  transform: rotate(${props => (props.toggle ? '45deg' : '0deg')});

  &::before,
  &::after {
    content: '';
    position: absolute;
    display: block;
    height: 2px;
    width: 1.5rem;
    background: ${props => (props.theme === 'dark' ? white : props => (props.toggle ? white : black))};
  }

  &::before {
    transform: translateY(-5px);

    opacity: ${props => (props.toggle ? 0 : 1)};
  }

  &::after {
    ${transition({ prop: 'transform' })};
    transform: translateY(5px);
    transform: rotate(${props => (props.toggle ? '-90deg' : '')});
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
