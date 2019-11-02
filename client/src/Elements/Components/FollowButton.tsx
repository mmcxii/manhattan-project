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
  const { user, dispatch } = useContext(UserContext);
  const lsLoginToken = localStorage.getItem('loginToken');
  const lsUserInfo = localStorage.getItem('userInfo');
  //@ts-ignore
  const userInfo: UserProps = JSON.parse(lsUserInfo);
  const [userIsFollowing, setUserIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    for (let i = 0; i < user.follows.length; i++) {
      if (user.follows[i].username === followTarget.username) {
        return setUserIsFollowing(true);
      }
    }

    setUserIsFollowing(false);
  }, [followTarget]);

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

        // Handle errors by displaying the error message to the user in an alert
        const errorCodes: number[] = [400, 404, 500];
        if (errorCodes.includes(response.status)) {
          const errorData: { status: number; message: string } = await response.json();

          return alert(errorData.message);
        }

        // Dispatch an action to UserContext reducer based on component state
        dispatch({ type: userIsFollowing ? 'REMOVE_FOLLOW' : 'ADD_FOLLOW', payload: followTarget });

        // Update localstorage based on component state
        if (!userIsFollowing) {
          localStorage.setItem(
            'userInfo',
            JSON.stringify({ ...userInfo, follows: [...userInfo.follows, followTarget] })
          );
        } else {
          localStorage.setItem(
            'userInfo',
            JSON.stringify({ ...userInfo, follows: userInfo.follows.filter(item => item.id !== followTarget.id) })
          );
        }
        setUserIsFollowing(!userIsFollowing);
      } catch (err) {
        console.log(err);
      }
    } else {
      push('/login');
    }
  };

  return (
    <>
      {user.username === followTarget.username ? (
        <NoButton />
      ) : (
        <Button onClick={toggleFollow} followed={userIsFollowing}>
          {userIsFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      )}
    </>
  );
};

export default FollowButton;

const NoButton = styled.div`
  grid-area: follow;
`;

const Button = styled(SrcButton)<{ followed: boolean }>`
  grid-area: follow;
  ${props => (props.followed ? `background: ${red} !important; color: ${white} !important;` : null)}
`;
