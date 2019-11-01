import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { UserProps } from 'Store';
import { spacing } from 'Utilities';
import placeholder from 'Assets/img/placeholder.png';

interface Props {
  user: UserProps;
}

const User: React.FC<Props> = ({ user }) => (
  <Wrapper>
    <Link to={`/user/${user.username}`}>
      <h4>{user.name || user.username}</h4>
      <img src={user.imgUrl || placeholder} alt={user.username || user.username} />
    </Link>
  </Wrapper>
);

export default User;

const Wrapper = styled.article`
  margin: ${spacing.sm} 0;
  > a {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;

    > img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      object-position: center;
      margin-right: ${spacing.sm};
    }
  }
`;
