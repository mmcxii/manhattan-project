import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { ThemeContextProvider, UserContextProvider } from 'Store';
import App from './App';

ReactDOM.render(
  <UserContextProvider>
    <ThemeContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeContextProvider>
  </UserContextProvider>,
  document.getElementById('root')
);
