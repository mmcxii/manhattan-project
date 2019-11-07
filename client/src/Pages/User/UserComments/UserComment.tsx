import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { CommentProps, ThemeContext, UserProps } from 'Store';
import { Rating, UserIcon} from 'Elements';
import { spacing, white, black, fadeIn } from 'Utilities';

interface Props {
  comment: CommentProps;
  user: UserProps;
}

const UserComment: React.FC<Props> = ({ comment, user }) => {
  const { theme } = useContext(ThemeContext);
  const { dateCreated, product } = comment;

  return (
    <>

    <Wrapper theme={theme}>
      <Rating upvotes={comment.upvotes} downvotes={comment.downvotes} type='comments' id={comment._id} ratingValue={comment.rating} />
      <UserIcon user={user} /> 
      <Author>
        <Link to={`/${product._id}/detail`}>{product.name}</Link>
        <Interpunct>{'\u00B7'}</Interpunct>
        <Date>{moment(dateCreated).fromNow()}</Date>
      </Author>
      <Text>{comment.text}</Text>
    </Wrapper>

    </>
  );
};

export default UserComment;

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
  animation: ${fadeIn} 200ms linear;
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

const Interpunct = styled.span`
  margin: 0 ${spacing.sm};
`;

const Date = styled.span`
  font-size: 0.7em;
`;

const Text = styled.p`
  grid-area: text;
`;
