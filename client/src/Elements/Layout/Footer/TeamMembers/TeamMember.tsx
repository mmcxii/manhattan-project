import React from 'react';
import styled from 'styled-components';
import { spacing, red, transition } from 'Utilities';

interface Props {
  name: string;
  github: string;
  linkedIn: string;
  portfolio: string;
}

const TeamMember: React.FC<Props> = ({ name, github, linkedIn, portfolio }) => (
  <Item>
    <Name>{name}</Name>

    <Link href={github} target='blank'>
      <Icon className='fab fa-github' />
    </Link>
    <Link href={linkedIn} target='blank'>
      <Icon className='fab fa-linkedin-in' />
    </Link>
    <Link href={portfolio} target='blank'>
      <Icon className='fas fa-browser' />
    </Link>
  </Item>
);

export default TeamMember;

const Item = styled.li`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr repeat(3, max-content);
  grid-gap: ${spacing.sm};
  grid-auto-flow: column;
  font-size: 1.1rem;
`;

const Name = styled.span`
  text-transform: capitalize;
`;

const Icon = styled.i``;

const Link = styled.a`
  text-decoration: none;
  ${transition({ prop: 'color' })};

  &:hover {
    color: ${red};
  }
`;
