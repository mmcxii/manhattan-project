import React from 'react';
import styled from 'styled-components';

import { UserProps } from 'Store';

interface Props {
  list: {
    title: string;
    list: UserProps[] | undefined;
    emptyListMessage: string;
  };
}

const List: React.FC<Props> = ({ list }) => (
  <>
    <Title>{list.title}</Title>
    {list.list ? (
      <ListWrapper>
        {list.list.map(follow => (
          <ListItem key={follow.username}>{follow.name || follow.username}</ListItem>
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

const ListWrapper = styled.ul``;

const ListItem = styled.li``;

const EmptyListMessage = styled.p``;