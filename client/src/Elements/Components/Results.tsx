import styled from 'styled-components';
import { spacing } from 'Utilities';
import elevation from '../../Utilities/elevation';

export const Results = styled.div`
  font-family: arial;
  transition: all 0.1s ease-in;
  cursor: pointer;
  margin: 0 2px;

  &.sibling {
    transform: scale(1.3);
  }
  &.current {
    z-index: 5;
    position: relative;
  }
  &:hover {
    transform: scale(1.1);
    background: #bbb;
    ${elevation[5]};
  }
`;
