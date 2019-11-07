import React from 'react';

import { CommentProps, UserProps } from 'Store';
import UserComment from './UserComment'

import { Card, CardHeader, CardBody } from 'Elements';


interface Props {
    comments: CommentProps[];
    user: UserProps;
  }
  
  const UserCommentsList: React.FC<Props> = ({ comments, user }) => (
    <>
    <CardHeader as='h3'>{`${user.name || user.username}'s Comments`}</CardHeader>
    <CardBody>  
    <section>
      {comments.length === 0 ? (
        <p>This user doesn't have any comments yet!</p>
      ) : (
        comments.map(comment => <UserComment key={comment._id} comment={comment} user={user} />)
      )}
    </section>
    </CardBody>
    </>
  );
  
  export default UserCommentsList;