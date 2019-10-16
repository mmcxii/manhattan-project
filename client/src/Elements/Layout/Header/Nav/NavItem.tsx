import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { spacing, white, transition, black } from 'Utilities';

interface Props {
  page: string;
  link: string;
  icon: string;
  hideNav: () => void;
  theme: string;
}

const NavItem: React.FC<Props> = ({ page, link, icon, hideNav, theme }) => (
  <Item theme={theme}>
    <Link exact to={link} onClick={hideNav}>
      <Icon className={icon} />
      <Text theme={theme}>{page}</Text>
    </Link>
  </Item>
);

export default NavItem;

const Item = styled.li<{ theme: 'dark' | 'light' }>`
  @media screen and (min-width: 768px) {
    padding: 0 ${spacing.md};

    &:not(:last-child) {
      border-right: 2px solid ${props => (props.theme === 'dark' ? white : black)};
    }
  }
`;

const Icon = styled.i`
  margin-right: ${spacing.sm};
`;

const Text = styled.span<{ theme: 'dark' | 'light' }>`
  position: relative;

  &::after {
    content: '';
    height: 2px;
    width: 100%;
    background: ${props => (props.theme === 'dark' ? white : black)};
    transform: scaleX(0);
    position: absolute;
    left: 0;
    bottom: -2px;
    ${transition({ prop: 'transform' })}
  }
`;

const Link = styled(NavLink)`
  text-decoration: none;

  &.active,
  &:hover {
    ${Text}::after {
      transform: scaleX(1);
    }
  }
`;
