import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useForm } from 'Hooks';
import { Button, Card, CardBody, CardHeader, Form, Input } from 'Elements';
import ResultsItem from './ResultsItem';

// TODO: Austin display search results

interface Props {}

interface CommonProps {
  _id: string;
  _image: string;
  _desc: string;
}
// abv number | Subtype string | ingrediants = [{}] | directions string | glass string | desc string | organic boolean | --> product.details
export interface BeerProps extends CommonProps {
  _organic: boolean;
  _subtype: string;
  _abv: number;
}

// export interface CocktailProps extends CommonProps {
//   _glass: string;
//   _directions: string;
// }

const SearchForm: React.FC<Props> = () => {
  const { type } = useParams();
  const [searchResults, setSearchResults] = useState<BeerProps[]>([]);
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: values.query })
      });
      const data: BeerProps[] = await response.json();

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
            {searchResults.map((item: BeerProps) => (
              <ResultsItem key={item._id} item={item}>
                <h1>{item._id}</h1>
                <p>{item._desc}</p>
                <img alt='what you want to see is lost'>{item._image}</img>
              </ResultsItem>
            ))}
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default SearchForm;
