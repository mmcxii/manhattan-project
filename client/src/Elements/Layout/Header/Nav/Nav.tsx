import React from 'react';
import styled from 'styled-components';

import NavItem from './NavItem';

interface Props {}

const Nav: React.FC<Props> = () => {
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
  return (
    <Navbar>
      <NavList>
        {navItems.map(item => (
          <NavItem key={item.page} {...item} />
        ))}
      </NavList>
    </Navbar>
  );
};

export default Nav;

const Navbar = styled.nav``;

const NavList = styled.ul``;
