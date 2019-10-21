import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Normalize from 'react-normalize';

import { ThemeContext, UserContext } from 'Store';
import Router from 'Pages';
import { white, black, grey, whiteLight, transition, blackDark, greyLight } from 'Utilities';
import { Header, Footer, Button, CardBody, CardHeader } from 'Elements';
import homebg from './Assets/img/homebg.png';

const App: React.FC = () => {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <Normalize />
      <GlobalStyles theme={theme} location={pathname} />

      <Header />
      <Router />
      <Footer />
    </>
  );
};

export default App;

const GlobalStyles = createGlobalStyle<{ theme: 'dark' | 'light'; location: string }>`
  // Reset
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  // Set up body layout with sticky footer
  body,
  html,
  #root {
    min-height:100vh
  }

  // Theme styling for generic components, additional theming is done at component level in certain places
  #root {
    display: flex;
    flex-direction: column;
    
    background: ${props => (props.theme === 'dark' ? black : white)};
    color: ${props => (props.theme === 'dark' ? white : black)};
    ${props =>
      props.location === '/'
        ? `
        background-image: url(${homebg});
        background-color: rgba(0,0,0,0.25);
        background-blend-mode: darken;
        background-size: cover;
        background-position: center;
      `
        : ''}
  }
  
  a {
    color: inherit;
  }
  
  header, footer {
    background: ${props => (props.theme === 'dark' ? blackDark : whiteLight)};    
  }

  ${CardHeader} {
    color: ${props => (props.location === '/' ? white : 'intitial')}
  }

  ${CardBody} {
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
