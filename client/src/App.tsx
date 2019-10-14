import React, { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import Normalize from 'react-normalize';

import { ThemeContext } from 'Store';
import Router from 'Pages';
import { white, black } from 'Utilities';
import { Header, Footer } from 'Elements';

const App: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Normalize />
      <GlobalStyles theme={theme} />

      <Header />
      <Router />
      <Footer />
    </>
  );
};

export default App;

const GlobalStyles = createGlobalStyle<{ theme: 'dark' | 'light' }>`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${props => (props.theme === 'dark' ? white : black)};
  }

  body,
  html,
  #root {
    min-height:100vh
  }

  #root {
    display: flex;
    flex-direction: column;
    
    background: ${props => (props.theme === 'dark' ? black : white)};
  }
`;
