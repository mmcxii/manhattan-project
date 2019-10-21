import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useForm } from 'Hooks';
import { Button, Card, CardBody, CardHeader, Form, Input } from 'Elements';
import ResultsItem from './ResultsItem';

// TODO: Austin display search results

interface Props {}

interface CommonProps {
  _id: string;
  image: string;
  desc: string;
}
// abv number | Subtype string | ingrediants = [{}] | directions string | glass string | desc string | organic boolean | --> product.details
export interface BeerProps extends CommonProps {
  organic: boolean;
  subtype: string;
  abv: number;
}

export interface CocktailProps extends CommonProps {
  glass: string;
  directions: string;
}

const SearchForm: React.FC<Props> = () => {
  const { type } = useParams();
  const [searchResults, setSearchResults] = useState<
    BeerProps[] | CocktailProps[]
  >([]);
  const [values, handleChange] = useForm({ query: '' });
  const icon =
    type === 'beer'
      ? 'fa-beer'
      : type === 'wine'
      ? 'fa-wine-glass-alt'
      : 'fa-glass-martini-alt';

  const APISearch = async (mode: string) => {
    try {
      const response: Response = await fetch(`/api/search/${mode}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: values.query })
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
            {/* {searchResults.map((item: BeerProps | CocktailProps) => (
              <ResultsItem key={item._id} item={item} />
            ))} */}
            {searchResults.map((item: BeerProps | CocktailProps) => (
              <p>{item._id}</p>
            ))}
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default SearchForm;
