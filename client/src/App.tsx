import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Normalize from 'react-normalize';

import Pages from 'Pages';
import { Header, Footer } from 'Elements';

const App: React.FC = () => {
  return (
    <>
      <Normalize />
      <GlobalStyles />

      <Header />
      <Pages />
      <Footer />
    </>
  );
};

export default App;

const GlobalStyles = createGlobalStyle``;
