import React from 'react';
import styled from 'styled-components';

import { UserProps } from 'Store';
import { ButtonLink, Card, CardHeader, CardBody, AvatarLg } from 'Elements';
import { spacing } from 'Utilities';

interface Props {
  isUsersProfile: boolean;
  profileInfo: UserProps;
}

const UserInfo: React.FC<Props> = ({ isUsersProfile, profileInfo }) => (
  <Wrapper>
    <CardHeader>{profileInfo.name || profileInfo.username}</CardHeader>
    <Info isUsersProfile={isUsersProfile}>
      {isUsersProfile && (
        <EditProfileButton to={`/edit/${profileInfo.username}`}>Edit information</EditProfileButton>
      )}

      <InfoContent>
        {profileInfo.age && <small>{profileInfo.age}</small>}
        {profileInfo.bio && <p>{profileInfo.bio}</p>}
        {profileInfo.imgUrl && <AvatarLg src={profileInfo.imgUrl} />}
      </InfoContent>
    </Info>
  </Wrapper>
);

export default UserInfo;

const Wrapper = styled(Card).attrs({ as: 'section' })``;

const Info = styled(CardBody)<{ isUsersProfile: boolean }>`
  display: grid;
  ${props =>
    props.isUsersProfile
      ? `
    grid-template-rows: max-content 1fr;
    grid-template-areas: 'edit-profile-button' 'content';
    grid-gap: ${spacing.sm};

    @media screen and (min-width: 768px) {
      grid-template-columns: 1fr max-content;
      grid-template-areas: 'content edit-profile-button' 'content .';
    }
    `
      : `
    grid-template-rows: 1fr;
    grid-template-areas: 'content';
    `};
`;

const EditProfileButton = styled(ButtonLink)`
  grid-area: edit-profile-button;
`;

const InfoContent = styled.div`
  grid-area: content;
`;
