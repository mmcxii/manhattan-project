import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Card, CardHeader, CardBody } from 'Elements';
import { useTitle } from 'Hooks';

interface Props {}

const ErrorPage: React.FC<Props> = () => {
  useTitle('404 Page Not Found');
  const { goBack } = useHistory();

  return (
    <Card>
      <CardHeader>404</CardHeader>
      <CardBody>
        <p>
          Whoops! That page doesn't exist... Please click <Link to='/'>here</Link> to go back to the home page, or{' '}
          <span onClick={() => goBack()} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
            here
          </span>{' '}
          to go back to your previous page.
        </p>
      </CardBody>
    </Card>
  );
};

export default ErrorPage;
