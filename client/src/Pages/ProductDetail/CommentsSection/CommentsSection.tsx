import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody } from 'Elements';

import { CommentProps } from 'Store';
import AddCommentForm from './AddCommentForm';
import CommentsList from './CommentsList';

interface Props {
  type: string;
  productId?: string;
}

const CommentsSection: React.FC<Props> = ({ type, productId }) => {
  const [updateComments, setUpdateComments] = useState<boolean>(true);
  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(() => {
    let isSubscribed = true;

    const fetchComments = async () => {
      try {
        const response: Response = await fetch(`/api/products/${productId}/comments`, { method: 'GET' });
        const data: CommentProps[] = await response.json();

        isSubscribed && setComments(data);
      } catch (error) {
        console.log(error);
      } finally {
        isSubscribed && setUpdateComments(false);
      }
    };

    if (updateComments) {
      fetchComments();
    }

    return () => {
      isSubscribed = false;
    };
  }, [updateComments, productId]);

  return (
    <Card as='section'>
      <CardHeader as='h3'>Comments</CardHeader>
      <CardBody>
        <AddCommentForm setUpdateComments={setUpdateComments} />
        <CommentsList type={type} comments={comments} />
      </CardBody>
    </Card>
  );
};
export default CommentsSection;
