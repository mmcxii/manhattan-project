import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  page: string;
  link: string;
  icon: string;
}

const NavItem: React.FC<Props> = ({ page, link, icon }) => (
  <Item>
    <Link exact to={link}>
      <Icon className={icon} />
      <Text>{page}</Text>
    </Link>
  </Item>
);

export default NavItem;

const Item = styled.li``;

const Link = styled(NavLink)``;

const Icon = styled.i``;

const Text = styled.span``;
