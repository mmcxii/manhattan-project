import React from 'react';
import { Card, CardHeader, CardBody } from 'Elements';
import { CommentProps } from 'Store';
import CommentsList from './CommentsList';

interface Props {
  type: string;
  comments: CommentProps[];
}

const CommentsSection: React.FC<Props> = ({ type, comments }) => (
  <Card>
    <CardHeader>Comments</CardHeader>
    <CardBody>
      <CommentsList type={type} comments={comments} />
    </CardBody>
  </Card>
);

export default CommentsSection;
