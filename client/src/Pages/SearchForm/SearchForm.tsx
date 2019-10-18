import React from 'react';
import { useParams } from 'react-router-dom';

import { useForm } from 'Hooks';
import { Button, Form, Input } from 'Elements';

interface Props {}

const SearchForm: React.FC<Props> = () => {
  const { type } = useParams();
  const [values, handleChange] = useForm({ query: '' });

  return (
    <>
      <h3>{type} search</h3>
      <Form>
        <Input
          name='query'
          value={values.query}
          onChange={handleChange}
          icon='far fa-glass-martini-alt'
          label={`What ${type} would you like?`}
          placeholder='Enter what you want here...'
        />
        <Button type='submit'>Search</Button>
      </Form>
    </>
  );
};

export default SearchForm;
