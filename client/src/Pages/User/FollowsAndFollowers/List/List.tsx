import React from 'react';
import styled from 'styled-components';

import { UserProps } from 'Store';
import User from './User';

interface Props {
  list: {
    title: string;
    list: UserProps[];
    emptyListMessage: string;
  };
}

const List: React.FC<Props> = ({ list }) => (
  <>
    <Title>{list.title}</Title>
    {list.list.length > 0 ? (
      <ListWrapper>
        {list.list.map(follow => (
          <User key={follow.username} user={follow} />
        ))}
      </ListWrapper>
    ) : (
      <EmptyListMessage>{list.emptyListMessage}</EmptyListMessage>
    )}
  </>
);

export default List;

const Title = styled.h4`
  text-transform: capitalize;
`;

const ListWrapper = styled.section``;

const EmptyListMessage = styled.p``;
