import React from 'react';

import { CommentProps } from 'Store';
import Comment from './Comment';

interface Props {
  type: string;
  comments: CommentProps[];
}

const CommentsList: React.FC<Props> = ({ type, comments }) => (
  <section>
    {comments.length === 0 ? (
      <p>There are no comments for this {type === 'BEER' ? 'beer' : 'cocktail recipe'} yet.</p>
    ) : (
      comments.map(comment => <Comment key={comment._id} comment={comment} />)
    )}
  </section>
);

export default CommentsList;
