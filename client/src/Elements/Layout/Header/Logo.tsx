import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { spacing, red } from 'Utilities';

interface Props {}

const Logo: React.FC<Props> = () => (
  <Wrapper to='/'>
    <Icon className='fas fa-glass-martini-alt' />
    <Text>The Manhattan Project</Text>
  </Wrapper>
);

export default Logo;

const shiftLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Wrapper = styled(Link)`
  grid-area: logo;

  display: flex;
  justify-content: center;
  text-decoration: none;

  @media screen and (min-width: 768px) {
    justify-self: flex-start;
  }
`;

const Icon = styled.i`
  font-size: 30px;
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
  animation: ${shiftLeft} 800ms ease-out;

  @media screen and (min-width: 768px) {
    display: inline;
  }
`;
