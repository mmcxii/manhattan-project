import React from 'react';
import styled from 'styled-components';

import { UserProps } from 'Store';
import { spacing } from 'Utilities';
import { Card, CardHeader, CardBody, AvatarLg, FollowButton } from 'Elements';
import placeholder from 'Assets/img/placeholder.png';

interface Props {
  profileInfo: UserProps;
}

const UserInfo: React.FC<Props> = ({ profileInfo }) => (
  <Wrapper>
    <CardHeader>{profileInfo.name || profileInfo.username}</CardHeader>
    <Info>
      <FollowButton />

      <ProfilePicture src={profileInfo.imgUrl || placeholder} alt={profileInfo.name || profileInfo.username} />

      <InfoContent>
        <Card>
          <CardHeader as='h3'>About {profileInfo.name || profileInfo.username}:</CardHeader>
          <CardBody>
            {profileInfo.age && <p>Age: {profileInfo.age}</p>}
            {profileInfo.bio && <p>{profileInfo.bio}</p>}
          </CardBody>
        </Card>
      </InfoContent>
    </Info>
  </Wrapper>
);

export default UserInfo;

const Wrapper = styled(Card).attrs({ as: 'section' })``;

const Info = styled(CardBody)`
  display: grid;
  grid-template-rows: repeat(2, max-content) 1fr;
  grid-template-areas:
    'follow'
    'picture'
    'info';
  grid-gap: ${spacing.sm};

  @media screen and (min-width: 768px) {
    grid-template-rows: max-content 1fr;
    grid-template-columns: max-content 1fr max-content;
    grid-template-areas:
      'picture . follow'
      'picture info info';
  }
`;

const ProfilePicture = styled(AvatarLg)`
  grid-area: picture;

  margin: auto;
`;

const InfoContent = styled.div`
  grid-area: info;

  display: flex;
  flex-direction: column;
`;
