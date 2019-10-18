import React, { useState } from 'react';
import styled from 'styled-components';

import { Card, CardHeader, CardBody } from 'Elements';
import SearchForm from './SearchForm';
import ModeSelection from './ModeSelection';

interface Props {}

const Home: React.FC<Props> = () => {
  const [selection, setSelection] = useState<'' | 'beer' | 'wine' | 'cocktail'>('');

  return (
    <WelcomeCard>
      <CardHeader>the manhattan project</CardHeader>
      <CardBody>
        {selection === '' ? <ModeSelection setSelection={setSelection} /> : <SearchForm type={selection} />}
      </CardBody>
    </WelcomeCard>
  );
};

export default Home;

const WelcomeCard = styled(Card).attrs({ as: 'section' })`
  margin: auto;
`;
