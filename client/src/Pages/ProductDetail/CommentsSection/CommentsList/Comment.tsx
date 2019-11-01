import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { CommentProps, ThemeContext } from 'Store';
import { Rating } from 'Elements';
import { spacing, white, black } from 'Utilities';

interface Props {
  comment: CommentProps;
}

const Comment: React.FC<Props> = ({ comment }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper theme={theme}>
      <Rating upvotes={comment.upvotes} downvotes={comment.downvotes} type='comments' id={comment._id} />
      <Author>
        <Link to={`/user/${comment.author.username}`}>{comment.author.name || comment.author.username}</Link>
      </Author>
      <Text>{comment.text}</Text>
    </Wrapper>
  );
};

export default Comment;

const Wrapper = styled.article<{ theme: 'dark' | 'light' }>`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    'rating author'
    'rating text';
  grid-row-gap: ${spacing.xs};
  grid-column-gap: ${spacing.sm};
  border-bottom: 1px solid ${props => (props.theme === 'dark' ? white : black)};
  padding: ${spacing.sm};
`;

const Author = styled.h4`
  grid-area: author;
  > a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Text = styled.p`
  grid-area: text;
`;
