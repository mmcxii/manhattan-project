import styled from 'styled-components';

import { spacing, rounded, elevation, transition } from 'Utilities';

export const Card = styled.div`
  padding: ${spacing.md};
  border-radius: ${rounded};
  ${elevation[3]};
  ${transition({ prop: 'box-shadow' })};

  &:hover {
    ${elevation[4]};
  }
`;
