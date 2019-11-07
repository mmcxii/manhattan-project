import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';

import { useForm, useTitle } from 'Hooks';
import { Button, Card, CardBody, CardHeader, Form, Input } from 'Elements';
import { ResultsItem, MixedDetails, BeerDetails } from './ResultsItem';
import { spacing, greyLight } from '../../Utilities';

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
  subType: string;
}

// abv number | Subtype string | ingrediants = [{}] | directions string | glass string | desc string | organic boolean | --> product.details
export interface MixedProps {
  glassType: string;
  directions: string;
  image: string[];
  ingredients: [
    {
      name: string;
      measurement: string;
    }
  ];
}

const Spacer = styled.hr`
  margin: ${spacing.md} 0;
  border-color: ${greyLight};
  opacity: 0.5;
`;

const SearchForm: React.FC<Props> = () => {
  const { type, query } = useParams();
  const { push } = useHistory();
  const [beerResults, setBeerResults] = useState<ProductProps<BeerProps>[]>([]);
  const [mixedResults, setMixedResults] = useState<ProductProps<MixedProps>[]>([]);
  const [resultCount, setResultCount] = useState<number>(0);
  const [displayResults, setDisplayResults] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  useTitle(`Search: ${type === 'beer' ? 'Beer' : 'Cocktail'}`);
  const [values, handleChange] = useForm({ query: '' });
  const icon = type === 'beer' ? 'fa-beer' : 'fa-glass-martini-alt';

  const APISearch = async <T extends unknown>(mode: string): Promise<ProductProps<T>[]> => {
    setDisplayResults(false);
    let data: ProductProps<T>[] = [];

    try {
      let params: string;

      /* If the user is brought to this page with an existing query,
         such as if they were linked to it or if they are returning to the page
         from visiting a specific item returned from the search */
      if (query && values.query === '') {
        const previousSearch: string = query.split('=')[1];
        setSearchTerm(previousSearch);
        params = query;

        /* Otherwise overwrite the current route params */
      } else {
        params = queryString.stringify(values);
        push(`/search/${type}/${params}`);
        setSearchTerm(values.query);
      }

      const response: Response = await fetch(`/api/products?type=${mode}&${params}`);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      data = await response.json();

      setResultCount(data.length);
    } catch (err) {
      console.log(err);
    }

    setDisplayResults(true);

    return data;
  };

  // Perform product search
  const productSearch = async (): Promise<void> => {
    // Retrieve appropriate product type and update state
    switch (type) {
      case 'beer':
        // eslint-disable-next-line
        const beerData = await APISearch<BeerProps>(type);
        setBeerResults(beerData);
        setMixedResults([]);
        break;
      case 'cocktail':
        // eslint-disable-next-line
        const mixedData = await APISearch<MixedProps>('mixed');
        setMixedResults(mixedData);
        setBeerResults([]);
        break;
      default:
        return;
    }
  };

  // Handle form submission for product searches
  const onSearchSubmit = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    // Prevent form submission
    evt.preventDefault();
    if (!type) {
      return;
    }

    await productSearch();
  };

  useEffect(() => {
    const onLoadSearch = async () => await productSearch();

    if (query) {
      onLoadSearch();
    }
    // dev-tips wants APISearch to be included in this array but that would require it to be wrapped in useCallback
    // Since I am unsure of how to correctly implement that I will do that later tonight.
  }, [type, query]);

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
          <CardHeader>{`${searchTerm} - ${resultCount} results`}</CardHeader>
          <CardBody>
            {beerResults.length > 0 &&
              beerResults.map(item => (
                <div key={item._id}>
                  <ResultsItem item={item}>
                    <BeerDetails item={item} />
                  </ResultsItem>
                  <Spacer />
                </div>
              ))}
            ​
            {mixedResults.length > 0 &&
              mixedResults.map(item => (
                <div key={item._id}>
                  <ResultsItem item={item}>
                    <MixedDetails item={item} />
                  </ResultsItem>
                  <Spacer />
                </div>
              ))}
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default SearchForm;
