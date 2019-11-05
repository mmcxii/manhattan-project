import React from 'react';
import styled from 'styled-components';

import { spacing } from 'Utilities';
import placeholder from 'Assets/img/placeholder.png';

interface Props {
  imgSrc?: string;
  user: string;
  withMargin?: boolean;
}

export const UserIcon: React.FC<Props> = ({ imgSrc, user, withMargin }) => (
  <Img src={imgSrc || placeholder} alt={user} withMargin={withMargin} />
);

const Img = styled.img<{ withMargin?: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  object-position: center;
  ${props => props.withMargin && `margin-right: ${spacing.sm};`}
`;
