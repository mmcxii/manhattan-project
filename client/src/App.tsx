import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Normalize from 'react-normalize';

import Router from 'Pages';
import { Header, Footer } from 'Elements';

const App: React.FC = () => {
  return (
    <>
      <Normalize />
      <GlobalStyles />

      <Header />
      <Router />
      <Footer />
    </>
  );
};

export default App;

const GlobalStyles = createGlobalStyle``;
