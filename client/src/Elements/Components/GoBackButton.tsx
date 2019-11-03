import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Button as B } from './Button';

interface Props {}

export const GoBackButton: React.FC<Props> = () => {
  const { goBack } = useHistory();

  return <Button onClick={goBack}>Return to Search</Button>;
};

const Button = styled(B)`
  @media screen and (min-width: 768px) {
    align-self: flex-end;
  }
`;
