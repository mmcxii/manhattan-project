import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from 'Hooks';
import { Button, Card, CardBody, CardHeader, Form, Input } from 'Elements';
import ResultsItem from './ResultsItem';

// TODO: Austin display search results

interface Props {}

interface ProductProps {
  // _id: string;
  // type: number;
  // extID: string;
  name: string;
  details: BeerProps[];
}

export interface BeerProps extends ProductProps {
  // desc: string;
  image: {
    // contentAwareIcon: string;
    // contentAwareLarge: string;
    // contentAwareMedium: string;
    icon: string;
    // large: string;
    // medium: string;
  }[];
  // ABV: number;
  // organic: boolean;
  // subtype: string;
}
// abv number | Subtype string | ingrediants = [{}] | directions string | glass string | desc string | organic boolean | --> product.details
// interface CocktailProps extends ProductProps {
//   glassType: string;
//   directions: string;
//   image: string[];
//   ingrediants: string;
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
      const params = queryString.stringify(values);
      const response: Response = await fetch(
        `/api/products?type=${mode}&${params}`,
        {
          method: 'GET'
        }
      );

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
            {searchResults.map((item: BeerProps) => (
              <ResultsItem key={item.name} item={item}>
                <h1>{item.name}</h1>
                <p>{item.details[0]}</p>
                <img alt='${item.name}'>{item.image}</img>
              </ResultsItem>
            ))}
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default SearchForm;
