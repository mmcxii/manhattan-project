import React, { useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { Card, CardHeader, CardBody, Button } from 'Elements';
import { UserContext } from 'Store';

interface Props {}

const Logout: React.FC<Props> = () => {
  const { dispatch } = useContext(UserContext);
  const { push } = useHistory();

  const logUserOut = () => {
    // Remove user info from localstorage and UserContext
    localStorage.removeItem('loginToken');
    localStorage.removeItem('userInfo');
    dispatch({ type: 'LOG_USER_OUT' });

    // Redirect the user to the home page
    push('/');
  };

  return (
    <LogoutCard>
      <CardHeader>Log out</CardHeader>
      <CardBody>
        <p>
          To log out of <cite>The Manhattan Project</cite> click the button below.
        </p>
        <Button onClick={logUserOut}>Click here to log out</Button>
      </CardBody>
    </LogoutCard>
  );
};

export default Logout;

const LogoutCard = styled(Card).attrs({ as: 'section' })`
  margin: auto;
`;
