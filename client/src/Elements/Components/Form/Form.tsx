import styled from 'styled-components';

import { spacing } from 'Utilities';

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  > * {
    margin: ${spacing.sm} 0;
  }
`;
