import React from 'react';
import styled from 'styled-components';

import { Card, CardHeader, CardBody } from 'Elements';
import ModeSelection from './ModeSelection';

interface Props {}

const Home: React.FC<Props> = () => (
  <WelcomeCard>
    <CardHeader>the manhattan project</CardHeader>
    <CardBody>
      <ModeSelection />
    </CardBody>
  </WelcomeCard>
);

export default Home;

const WelcomeCard = styled(Card).attrs({ as: 'section' })`
  margin: auto;
`;
