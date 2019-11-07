import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { spacing } from 'Utilities';

export const Button = styled.button`
  cursor: pointer;
  border: none;
  padding: ${spacing.sm} ${spacing.md};
`;

export const ButtonLink = styled(Link)`
  cursor: pointer;
  border: none;
  padding: ${spacing.sm} ${spacing.md};
  display: inline-block;
  text-decoration: none;
`;

export const ButtonTrans = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
`;
