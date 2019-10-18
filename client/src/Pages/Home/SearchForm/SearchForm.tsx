import React from 'react';

interface Props {
  type: 'beer' | 'wine' | 'cocktail';
}

const SearchForm: React.FC<Props> = ({ type }) => {
  return (
    <>
      <h3>{type} search</h3>
    </>
  );
};

export default SearchForm;
