import React from 'react';
import styled from 'styled-components';

import { Card } from 'Elements';

interface Props {}

const Home: React.FC<Props> = () => {
  return <WelcomeCard>welcome to the manhattan project</WelcomeCard>;
};

export default Home;

const WelcomeCard = styled(Card).attrs({ as: 'section' })``;
