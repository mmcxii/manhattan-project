import styled from 'styled-components';
import { rounded, spacing } from 'Utilities'

export const AvatarLg = styled.img`
  max-width: 250px;
  width: 100%
  height: auto;
  border-radius: ${rounded};
  margin: ${spacing.sm} 0;
`;
