import React from 'react';
import styled from 'styled-components';

import { UserProps } from 'Store';
import { Button } from 'Elements';

interface Props {
  isUsersProfile: boolean;
  profileInfo: UserProps;
}

const UserInfo: React.FC<Props> = ({ isUsersProfile, profileInfo }) => (
  <>
    {isUsersProfile && <EditProfileButton>Edit information</EditProfileButton>}
    {profileInfo.age && <small>{profileInfo.age}</small>}
    {profileInfo.bio && <p>{profileInfo.bio}</p>}
  </>
);

export default UserInfo;

const EditProfileButton = styled(Button)`
  justify-self: flex-end;
`;
