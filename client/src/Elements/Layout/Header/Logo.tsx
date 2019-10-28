import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { spacing, red } from 'Utilities';

interface Props {}

const Logo: React.FC<Props> = () => (
  <Wrapper to='/'>
    <Icon className='fas fa-glass-martini-alt' />
    <Text>The Manhattan Project</Text>
  </Wrapper>
);

export default Logo;

const Wrapper = styled(Link)`
  display: flex;
  text-decoration: none;
`;

const Icon = styled.i`
  font-size: 15px;
  line-height: 30px;
  height: 30px;
  width: 30px !important;
  border-radius: 50%;
  background: ${red};

  @media screen and (min-width: 768px) {
    margin-right: ${spacing.sm};
  }
`;

const Text = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  display: none;
  letter-spacing: 2px;

  @media screen and (min-width: 768px) {
    display: inline;
  }
`;
