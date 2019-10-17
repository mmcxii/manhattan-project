import React from 'react';
import styled from 'styled-components';
import { spacing, transition, red } from 'Utilities';

interface Props {
  name: string;
  link: string;
  icon: string;
}

const InfoItem: React.FC<Props> = ({ name, link, icon }) => (
  <Item>
    <Link href={link} target='blank'>
      <Icon className={icon} />
      <Name>{name}</Name>
    </Link>
  </Item>
);

export default InfoItem;

const Item = styled.li`
  font-size: 1.1rem;
`;

const Link = styled.a`
  text-decoration: none;
  display: grid;
  grid-template-columns: 20px 1fr;
  grid-gap: ${spacing.sm};
  grid-auto-flow: column;
  ${transition({ prop: 'color' })};

  &:hover {
    color: ${red};
  }
`;

const Icon = styled.i`
  justify-self: center;
`;

const Name = styled.span`
  text-transform: capitalize;
`;
