import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Normalize from 'react-normalize';

import { ThemeContext } from 'Store';
import Router from 'Pages';
import { white, black, grey, whiteLight, transition, blackDark, greyLight } from 'Utilities';
import { Header, Footer, Card, Button } from 'Elements';

const App: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Normalize />
      <GlobalStyles theme={theme} />

      <BrowserRouter>
        <Header />
        <Router />
        <Footer />
      </BrowserRouter>
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
    
    background: ${props => (props.theme === 'dark' ? black : whiteLight)};
  }

  ${Card} {
    background: ${props => (props.theme === 'dark' ? grey : white)};
    border: 1px solid ${props => (props.theme === 'dark' ? blackDark : grey)};
  }
  
  ${Button} {
    color: ${props => (props.theme === 'dark' ? black : white)};
    background: ${props => (props.theme === 'dark' ? white : grey)};
    ${transition({ prop: 'background' })};

    &:hover {
      background: ${props => (props.theme === 'dark' ? greyLight : black)};
    }
  }
`;
