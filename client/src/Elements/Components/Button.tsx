import styled from 'styled-components';

import { spacing, roundedInner } from 'Utilities';

export const Button = styled.button`
  cursor: pointer;
  border: none;
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${roundedInner};
`;
