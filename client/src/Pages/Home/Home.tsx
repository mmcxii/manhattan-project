import React from 'react';
import styled from 'styled-components';

import { Card, CardHeader, CardBody } from 'Elements';
import ModeSelection from './ModeSelection';

interface Props {}

const Home: React.FC<Props> = () => (
  <WelcomeCard>
    <WelcomeCardHeader>the manhattan project</WelcomeCardHeader>
    <CardBody>
      <ModeSelection />
    </CardBody>
  </WelcomeCard>
);

export default Home;

const WelcomeCard = styled(Card).attrs({ as: 'section' })`
  margin: auto;
`;

const WelcomeCardHeader = styled(CardHeader)`
  font-size: 2rem;
`;
