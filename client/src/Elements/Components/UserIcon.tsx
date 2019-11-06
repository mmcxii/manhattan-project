import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { UserProps } from 'Store';
import { spacing } from 'Utilities';
import placeholder from 'Assets/img/placeholder.png';

interface Props {
  user: UserProps;
  withMargin?: boolean;
}

export const UserIcon: React.FC<Props> = ({ user, withMargin }) => (
  <Wrapper to={`/user/${user.username}`}>
    <Img src={user.imgUrl || placeholder} alt={user.name || user.username} withMargin={withMargin} />
  </Wrapper>
);

const Wrapper = styled(Link)`
  text-decoration: none;
`;

const Img = styled.img<{ withMargin?: boolean }>`
  grid-area: icon;

  width: 50px;
  height: 50px;
  border-radius: 50px;
  object-position: center;
  ${props => props.withMargin && `margin-right: ${spacing.sm};`}
`;
