import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import { Container } from 'Elements';
import Home from './Home';
import User from './User';
import SearchForm from './SearchForm';
import Login from './Login';
import EditUser from './EditUser';
import CreateUser from './CreateUser';
import ErrorPage from './ErrorPage';

const Router: React.FC = () => (
  <PageContainer>
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route path='/create'>
        <CreateUser />
      </Route>

      <Route path='/login'>
        <Login />
      </Route>

      <Route path='/user/:username'>
        <User />
      </Route>

      <Route path='/edit/:username'>
        <EditUser />
      </Route>

      <Route path='/search/:type'>
        <SearchForm />
      </Route>

      <Route path='*'>
        <ErrorPage />
      </Route>
    </Switch>
  </PageContainer>
);

export default Router;

const PageContainer = styled(Container).attrs({ as: 'main' })`
  --header-offset: 45px;

  padding-top: var(--header-offset);
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    --header-offset: 65px;
  }
`;
