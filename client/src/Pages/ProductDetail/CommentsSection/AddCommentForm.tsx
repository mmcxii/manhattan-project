import React from 'react';

import { useForm } from 'Hooks';
import { Input, Form, Button } from 'Elements';

interface Props {}

const AddCommentForm: React.FC<Props> = () => {
  const [values, handleChange] = useForm({ text: '' });

  return (
    <Form>
      <Input name='text' type='textarea' label='Add a comment' placeholder='Enter your comment here' value={values.text} onChange={handleChange} />

      <Button type='submit'>Add Comment</Button>
    </Form>
  );
};

export default AddCommentForm;
