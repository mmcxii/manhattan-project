import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import { Container } from 'Elements';
import Home from './Home';
import User from './User';
import SearchForm from './SearchForm';
import Login from './Login';

const Router: React.FC = () => (
  <PageContainer>
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route path='/login'>
        <Login />
      </Route>

      <Route path='/user/:username'>
        <User />
      </Route>

      <Route path='/search/:type'>
        <SearchForm />
      </Route>
    </Switch>
  </PageContainer>
);

export default Router;

const PageContainer = styled(Container).attrs({ as: 'main' })`
  --header-offset: 85px;

  padding-top: var(--header-offset);
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    --header-offset: 140px;
  }
`;
