import React from 'react';
import { Card, CardHeader, CardBody } from 'Elements';

import { CommentProps } from 'Store';
import AddCommentForm from './AddCommentForm';
import CommentsList from './CommentsList';

interface Props {
  type: string;
  comments: CommentProps[];
}

const CommentsSection: React.FC<Props> = ({ type, comments }) => (
  <Card as='section'>
    <CardHeader as='h3'>Comments</CardHeader>
    <CardBody>
      <AddCommentForm />
      <CommentsList type={type} comments={comments} />
    </CardBody>
  </Card>
);

export default CommentsSection;
