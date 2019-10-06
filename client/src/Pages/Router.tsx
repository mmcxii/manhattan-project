import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from './Home';
import SearchResults from './SearchResults';
import User from './User';

const Router: React.FC = () => (
  <main>
    <BrowserRouter>
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
    </BrowserRouter>
  </main>
);

export default Router;
