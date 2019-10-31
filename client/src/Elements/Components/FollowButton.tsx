import React, { useState } from 'react';
import styled from 'styled-components';

import { red, white } from 'Utilities';
import { Button as SrcButton } from './Button';

interface Props {}

export const FollowButton: React.FC<Props> = () => {
  const [userIsFollowing, setUserIsFollowing] = useState<boolean>(false);

  const toggleFollow = async () => {
    setUserIsFollowing(!userIsFollowing);
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
  ${props => (props.followed ? `background: ${red}; color: ${white};` : null)}
`;
