import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from 'Hooks';
import { Button, Card, CardBody, CardHeader, Form, Input } from 'Elements';

// TODO: Austin display search results
// TODO: Define props for data returned from fetch call

interface Props {}

interface ProductProps {
  _id: string;
  name: string;
}

interface BeerProps extends ProductProps {
  // TODO: Define search result props here
}

interface CocktailProps extends ProductProps {
  // TODO: Define search result props here
}

const SearchForm: React.FC<Props> = () => {
  const { type } = useParams();
  const [searchResults, setSearchResults] = useState<BeerProps[] | CocktailProps[]>([]);
  const [values, handleChange] = useForm({ query: '' });
  const icon = type === 'beer' ? 'fa-beer' : type === 'wine' ? 'fa-wine-glass-alt' : 'fa-glass-martini-alt';

  const APISearch = async (mode: string) => {
    try {
      const params = queryString.stringify(values);
      const response: Response = await fetch(`/api/products?type=${mode}&${params}`, {
        method: 'GET',
      });

      const data: BeerProps[] | CocktailProps[] = await response.json();

      setSearchResults(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {searchResults.length === 0 ? (
        <Card as='section'>
          <CardHeader>{type} search</CardHeader>
          <CardBody>
            <Form
              onSubmit={e => {
                e.preventDefault();

                if (type) {
                  APISearch(type);
                }
              }}
            >
              <Input
                name='query'
                value={values.query}
                onChange={handleChange}
                icon={`far ${icon}`}
                label={`What ${type} would you like?`}
                placeholder='Enter what you want here...'
              />

              <Button type='submit'>Search</Button>
            </Form>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardHeader>{values.query}</CardHeader>
          <CardBody>
            {searchResults.map(item => (
              <p key={item._id}>{item.name}</p>
            ))}
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default SearchForm;
