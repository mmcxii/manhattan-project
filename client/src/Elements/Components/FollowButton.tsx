import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { UserProps, UserContext } from 'Store';
import { red, white } from 'Utilities';
import { Button as SrcButton } from './Button';

interface Props {
  followTarget: UserProps;
}

export const FollowButton: React.FC<Props> = ({ followTarget }) => {
  const { push } = useHistory();
  const { dispatch } = useContext(UserContext);
  const lsLoginToken = localStorage.getItem('loginToken');
  const lsUserInfo = localStorage.getItem('userInfo');
  //@ts-ignore
  const userInfo: UserProps = JSON.parse(lsUserInfo);
  const [userIsFollowing, setUserIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    dispatch({ type: 'ADD_FOLLOW', payload: followTarget });

    if (userInfo.follows) {
      if (userInfo.follows.includes(followTarget)) {
        setUserIsFollowing(true);
      }
    }
  }, []);

  const toggleFollow = async () => {
    if (lsLoginToken && lsUserInfo) {
      try {
        const response: Response = await fetch(`/api/users/${userInfo.username}/follows`, {
          method: userIsFollowing ? 'DELETE' : 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${lsLoginToken}`
          },
          body: JSON.stringify({
            username: followTarget.username
          })
        });

        const errorCodes: number[] = [400, 404, 500];
        if (errorCodes.includes(response.status)) {
          const errorData: { status: number; message: string } = await response.json();

          return alert(errorData.message);
        }

        const data = await response.json();

        console.log(data);
        setUserIsFollowing(!userIsFollowing);
        dispatch({ type: 'ADD_FOLLOWER', payload: followTarget });
      } catch (err) {
        console.log(err);
      }
    } else {
      push('/login');
    }
  };

  return (
    <Button onClick={toggleFollow} followed={userIsFollowing}>
      {userIsFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;

const Button = styled(SrcButton)<{ followed: boolean }>`
  grid-area: follow;
  ${props => (props.followed ? `background: ${red} !important; color: ${white} !important;` : null)}
`;
