import React from 'react';
import { Card, CardHeader, CardBody } from 'Elements';
import { CommentProps } from 'Store';

interface Props {
  type: string;
  comments: CommentProps[];
}

const CommentsSection: React.FC<Props> = ({ type, comments }) => (
  <Card>
    <CardHeader>Comments</CardHeader>
    <CardBody></CardBody>
  </Card>
);

export default CommentsSection;
