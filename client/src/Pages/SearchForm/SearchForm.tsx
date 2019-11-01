import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from 'Hooks';
import { Button, Card, CardBody, CardHeader, Form, Input } from 'Elements';
import ResultsItem from './ResultsItem/ResultsItem';

// import console = require('console');
interface Props {}
export interface ProductProps {
  _id: string;
  type: number;
  extID: string;
  name: string;
  upvotes: string[];
  downvotes: string[];
  imgUrl: string;
}

export interface BeerProps extends ProductProps {
  details: {
    desc: string;
    ABV?: number;
    organic: boolean;
    subtype: string;
  };
}
// abv number | Subtype string | ingrediants = [{}] | directions string | glass string | desc string | organic boolean | --> product.details
export interface MixedProps extends ProductProps {
  details: {
    glassType: string;
    directions: string;
    image: string[];
    ingrediants: string;
  };
}
const SearchForm: React.FC<Props> = () => {
  const { type } = useParams();
  const [beerResults, setBeerResults] = useState<BeerProps[]>([]);
  const [mixedResults, setMixedResults] = useState<MixedProps[]>([]);
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

        return setBeerResults(data);
      }

<<<<<<< HEAD
      if (mode === 'mixed') {
        const data: MixedProps[] = await response.json();
        console.log(data);

        return setMixedResults(data);
=======
      if (mode === 'cocktail') {
        const data: CocktailProps[] = await response.json();
        return setCocktailResults(data);
>>>>>>> d5fdef76d2bdab8b35cb5699ab4ce1b3dc421358
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
<<<<<<< HEAD
      {beerResults.length === 0 && mixedResults.length === 0 ? (
        <Card as='section'>
=======
      {beerResults.length === 0 && cocktailResults.length === 0 ? (
        <Card as="section">
>>>>>>> d5fdef76d2bdab8b35cb5699ab4ce1b3dc421358
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
            {beerResults.length > 0 && beerResults.map(item => <ResultsItem key={item._id} item={item} />)}
            {/* {console.log(mixedResults)} */}
            {mixedResults.length > 0 && mixedResults.map(item => <ResultsItem key={item._id} item={item} />)}
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default SearchForm;
