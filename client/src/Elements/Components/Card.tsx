import styled from 'styled-components';

import { spacing, elevation, transition, red, green, white, fadeIn } from 'Utilities';

export const Card = styled.div`
  min-width: 100%;
  animation: ${fadeIn} 200ms linear;
  &:not(:first-child) {
    margin: ${spacing.lg} 0;
  }
`;

export const CardHeader = styled.h2`
  text-transform: capitalize;
  padding-left: ${spacing.xs};
`;

export const CardBody = styled.div`
  padding: ${spacing.md};
  width: 100%;
  ${elevation[3]};
  ${transition({ prop: 'box-shadow' })};

  &:hover {
    ${elevation[4]};
  }

  /* Remove shadows from nested cards */
  ${Card} {
    > * {
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }
  }
`;

export const ErrorCard = styled(Card)`
  ${CardBody} {
    background: ${red};
    color: ${white};
  }
`;

export const SuccessCard = styled(Card)`
  ${CardBody} {
    background: ${green};
    color: ${white};
  }
`;
