import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { CommentProps, ThemeContext } from 'Store';
import { Rating, UserIcon } from 'Elements';
import { spacing, white, black } from 'Utilities';

interface Props {
  comment: CommentProps;
}

const Comment: React.FC<Props> = ({ comment }) => {
  const { theme } = useContext(ThemeContext);
  const { author } = comment;
  console.log(comment);
  return (
    <Wrapper theme={theme}>
      <Rating
        rating={comment.rating}
        upvotes={comment.upvotes}
        downvotes={comment.downvotes}
        type='comments'
        id={comment._id}
      />
      <UserIcon user={author} />
      <Author>
        <Link to={`/user/${author.username}`}>{author.name || author.username}</Link>
      </Author>
      <Text>{comment.text}</Text>
    </Wrapper>
  );
};

export default Comment;

const Wrapper = styled.article<{ theme: 'dark' | 'light' }>`
  display: grid;
  grid-template-columns: repeat(2, max-content) 1fr;
  grid-template-rows: repeat(2, max-content);
  grid-template-areas:
    'rating icon author'
    'rating icon text';
  grid-row-gap: ${spacing.xs};
  grid-column-gap: ${spacing.sm};
  align-items: center;
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
