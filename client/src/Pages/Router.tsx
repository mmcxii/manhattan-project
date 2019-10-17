import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import { Container } from 'Elements';
import Home from './Home';
import SearchResults from './SearchResults';
import User from './User';

const Router: React.FC = () => (
  <PageContainer>
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route path='/user/:username'>
        <User />
      </Route>

      <Route path='/results/:type'>
        <SearchResults />
      </Route>
    </Switch>
  </PageContainer>
);

export default Router;

const PageContainer = styled(Container).attrs({ as: 'main' })`
  --header-offset: 85px;

  margin-top: var(--header-offset);
  min-height: calc(100vh - var(--header-offset));

  @media screen and (min-width: 768px) {
    --header-offset: 140px;
  }
`;
