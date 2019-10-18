import React from 'react';
import styled from 'styled-components';

import { Card, CardHeader, CardBody } from 'Elements';
import SearchForm from './SearchForm';

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <WelcomeCard>
      <CardHeader>the manhattan project</CardHeader>
      <CardBody>
        <SearchForm />
      </CardBody>
    </WelcomeCard>
  );
};

export default Home;

const WelcomeCard = styled(Card).attrs({ as: 'section' })`
  margin: auto;
`;
