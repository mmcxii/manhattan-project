import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from 'Hooks';
import { Button, Card, CardBody, CardHeader, Form, Input } from 'Elements';
import { ResultsItem, MixedDetails, BeerDetails } from './ResultsItem';

interface Props {}

export interface ProductProps<T> {
  _id: string;
  type: number;
  extID: string;
  name: string;
  upvotes: string[];
  downvotes: string[];
  imgUrl: string;
  details: T;
}

export interface BeerProps {
  desc: string;
  ABV?: number;
  organic: boolean;
  subtype: string;
}

// abv number | Subtype string | ingrediants = [{}] | directions string | glass string | desc string | organic boolean | --> product.details
export interface MixedProps {
  glassType: string;
  directions: string;
  image: string[];
  ingrediants: string;
}

const SearchForm: React.FC<Props> = () => {
  const { type } = useParams();
  const [beerResults, setBeerResults] = useState<ProductProps<BeerProps>[]>([]);
  const [mixedResults, setMixedResults] = useState<ProductProps<MixedProps>[]>([]);
  const [displayResults, setDisplayResults] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [values, handleChange] = useForm({ query: '' });
  const icon = type === 'beer' ? 'fa-beer' : type === 'wine' ? 'fa-wine-glass-alt' : 'fa-glass-martini-alt';

  const APISearch = async <T extends unknown>(mode: string): Promise<ProductProps<T>[]> => {
    let data: ProductProps<T>[] = [];

    try {
      const params = queryString.stringify(values);

      const response: Response = await fetch(`/api/products?type=${mode}&${params}`);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      data = await response.json();
    } catch (err) {
      console.log(err);
    }

    if (displayResults === false) {
      setDisplayResults(true);
    }
    setSearchTerm(values.query);
    return data;
  };

  // Handle form submission for product searches
  const onSearchSubmit = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    // Prevent form submission
    evt.preventDefault();
    if (!type) {
      return;
    }

    // Retrieve appropriate product type and update state
    switch (type) {
      case 'beer':
        const beerData = await APISearch<BeerProps>(type);
        setBeerResults(beerData);
        break;
      case 'cocktail':
        const mixedData = await APISearch<MixedProps>('mixed');
        setMixedResults(mixedData);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <Card as='section'>
        <CardHeader>{type} search</CardHeader>
        <CardBody>
          <small>
            <Link to={`/search/${type === 'beer' ? 'cocktail' : 'beer'}`}>
              Not feeling a {type}? How about a {type === 'beer' ? 'cocktail' : 'beer'} instead?
            </Link>
          </small>
          <Form onSubmit={e => onSearchSubmit(e)}>
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

      {displayResults && (
        <Card>
          <CardHeader>{searchTerm}</CardHeader>
          <CardBody>
            {beerResults.length > 0 &&
              beerResults.map(item => (
                <ResultsItem key={`ri-${item._id}`} item={item}>
                  <BeerDetails key={`bd-${item._id}`} item={item} />
                </ResultsItem>
              ))}

            {mixedResults.length > 0 &&
              mixedResults.map(item => (
                <ResultsItem key={`ri-${item._id}`} item={item}>
                  <MixedDetails key={`md-${item._id}`} item={item} />
                </ResultsItem>
              ))}
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default SearchForm;
