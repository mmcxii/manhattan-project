import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from 'Hooks';
import { Button, Card, CardBody, CardHeader, Form, Input } from 'Elements';
import ResultsItem from './ResultsItem';
// import console = require('console');

// TODO: Austin display search results

interface Props {}

interface ProductProps {
  _id: string;
  type: number;
  extID: string;
  name: string;
  upvote: string[];
  downvote: string[];
  imgUrl: string;
  details: BeerProps[];
}

export interface BeerProps extends ProductProps {
  desc: string;
  ABV: number;
  organic: boolean;
  subtype: string;
}
// abv number | Subtype string | ingrediants = [{}] | directions string | glass string | desc string | organic boolean | --> product.details
export interface CocktailProps extends ProductProps {
  glassType: string;
  directions: string;
  image: string[];
  ingrediants: string;
}
const SearchForm: React.FC<Props> = () => {
  const { type } = useParams();
  const [beerResults, setBeerResults] = useState<BeerProps[]>([]);
  const [cocktailResults, setCocktailResults] = useState<CocktailProps[]>([]);
  const [values, handleChange] = useForm({ query: '' });
  const icon = type === 'beer' ? 'fa-beer' : type === 'wine' ? 'fa-wine-glass-alt' : 'fa-glass-martini-alt';

  const APISearch = async (mode: string) => {
    try {
      const params = queryString.stringify(values);
      const response: Response = await fetch(`/api/products?type=${mode}&${params}`, {
        method: 'GET'
      });

      if (mode === 'beer') {
        const data: BeerProps[] = await response.json();
        console.log(data);

        return setBeerResults(data);
      }

      if (mode === 'cocktail') {
        const data: CocktailProps[] = await response.json();
        console.log(data);

        return setCocktailResults(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {beerResults.length === 0 ? (
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
              <Input name='query' value={values.query} onChange={handleChange} icon={`far ${icon}`} label={`What ${type} would you like?`} placeholder='Enter what you want here...' />

              <Button type='submit'>Search</Button>
            </Form>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardHeader>{values.query}</CardHeader>
          <CardBody>
            {beerResults.length > 0 && beerResults.map(item => <ResultsItem key={item._id} item={item} />)}
            {cocktailResults.length > 0 && cocktailResults.map(item => <ResultsItem key={item._id} item={item} />)}
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default SearchForm;
