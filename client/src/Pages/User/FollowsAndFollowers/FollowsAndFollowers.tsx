import React, { useState } from 'react';
import styled from 'styled-components';

import { UserProps } from 'Store';
import { spacing, transition } from 'Utilities';
import { Card, CardHeader, CardBody } from 'Elements';
import List from './List';

interface Props {
  profileInfo: UserProps;
}

const FollowsAndFollowers: React.FC<Props> = ({ profileInfo }) => {
  const [currentTab, setCurrentTab] = useState<string>('follows');
  const tabs: string[] = ['follows', 'followers'];
  const lists: { title: string; list: UserProps[] | undefined; emptyListMessage: string }[] = [
    {
      title: 'follows',
      list: profileInfo.follows,
      emptyListMessage: 'This user is not following anyone yet.',
    },
    {
      title: 'followers',
      list: profileInfo.followers,
      emptyListMessage: 'This user is not followed by anyone yet.',
    },
  ];

  return (
    <Wrapper>
      <CardHeader as='h3'>{profileInfo.name || profileInfo.username}'s connections</CardHeader>
      <CardBody>
        <Tabs>
          {tabs.map(tab => (
            <Tab tab={tab} currentTab={currentTab} onClick={() => setCurrentTab(tab)} key={tab}>
              {tab}
            </Tab>
          ))}
        </Tabs>
        <ContentWrapper>
          {lists.map(list => currentTab === list.title && <List list={list} />)}
        </ContentWrapper>
      </CardBody>
    </Wrapper>
  );
};

export default FollowsAndFollowers;

const Wrapper = styled(Card).attrs({ as: 'section' })``;

const ContentWrapper = styled.section`
  padding-top: ${spacing.sm};
`;

const Tabs = styled.div`
  margin: -${spacing.md};
  margin-bottom: 0;
  background: rgba(0, 0, 0, 0.25);
`;

const Tab = styled.button<{ tab: string; currentTab: string }>`
  cursor: pointer;
  text-transform: capitalize;
  padding: ${spacing.sm} ${spacing.md};
  color: inherit;
  border: none;
  background: ${props => (props.tab === props.currentTab ? 'rgba(0,0,0,0.25)' : 'transparent')};
  ${transition({ prop: 'background' })};

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;
