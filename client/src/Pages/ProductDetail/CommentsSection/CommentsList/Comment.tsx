import React from 'react';

import { CommentProps } from 'Store';

interface Props {
  comment: CommentProps;
}

const Comment: React.FC<Props> = ({ comment }) => (
  <article>
    <h4>{comment.author.name || comment.author.username}</h4>
    <small>
      {/* TODO: add upvote/ downvote icon */} {comment.rating}
    </small>
    <p>{comment.text}</p>
  </article>
);

export default Comment;
