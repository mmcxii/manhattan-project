import React from 'react';
import styled from 'styled-components';

import { spacing, elevation, transition } from 'Utilities';

export const Card = styled.div`
  width: 100%;

  &:not(:first-child) {
    margin: ${spacing.lg} 0;
  }
`;

export const CardHeader = styled.h2``;

export const CardBody = styled.div`
  padding: ${spacing.md};
  width: 100%;
  ${elevation[3]};
  ${transition({ prop: 'box-shadow' })};

  &:hover {
    ${elevation[4]};
  }
`;
