import React from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useReturnToTop } from 'Hooks';
import { Container } from 'Elements';
import Home from './Home';
import User from './User';
import SearchForm from './SearchForm';
import Login from './Login';
import EditUser from './EditUser';
import CreateUser from './CreateUser';
import ErrorPage from './ErrorPage';
import Logout from './Logout';
import ProductDetail from './ProductDetail';

const Router: React.FC = () => {
  const params = useParams();

  // Whenever a new page is rendered (route params change), return to the top of the document
  useReturnToTop(params);

  return (
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

        <Route path='/logout'>
          <Logout />
        </Route>

        <Route path='/user/:username'>
          <User />
        </Route>

        <Route path='/edit/:username'>
          <EditUser />
        </Route>

        <Route path='/search/:type/:query?'>
          <SearchForm />
        </Route>

        <Route path='/:productId/detail'>
          <ProductDetail />
        </Route>

        <Route path='*'>
          <ErrorPage />
        </Route>
      </Switch>
    </PageContainer>
  );
};

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
