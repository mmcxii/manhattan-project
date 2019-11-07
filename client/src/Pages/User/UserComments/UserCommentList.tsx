import React from 'react';

import { CommentProps } from 'Store';
import UserComment from './UserComment'


interface Props {
    comments: CommentProps[];
  }
  
  const UserCommentsList: React.FC<Props> = ({ comments }) => (
    <section>
      {comments.length === 0 ? (
        <p>This user doesn't have any comments yet!</p>
      ) : (
        comments.map(comment => <UserComment key={comment._id} comment={comment} />)
      )}
    </section>
  );
  
  export default UserCommentsList;