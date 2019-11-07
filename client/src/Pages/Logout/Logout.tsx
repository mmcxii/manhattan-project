import React, { useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { useTitle } from 'Hooks';
import { Card, CardHeader, CardBody, Button } from 'Elements';
import { UserContext } from 'Store';
import { spacing } from '../../Utilities';

interface Props {}

const Logout: React.FC<Props> = () => {
  useTitle('Log Out');
  const { dispatch } = useContext(UserContext);
  const { push } = useHistory();

  const logUserOut = () => {
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
        <LogoutMessage>
          To log out of <cite>The Manhattan Project</cite> click the button below.
        </LogoutMessage>
        <Button onClick={logUserOut}>Click here to log out</Button>
      </CardBody>
    </LogoutCard>
  );
};

export default Logout;

const LogoutCard = styled(Card).attrs({ as: 'section' })`
  margin: auto;
`;

const LogoutMessage = styled.p`
  margin: ${spacing.lg} 0;
`;
