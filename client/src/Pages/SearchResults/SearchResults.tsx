import React from 'react';
import { useParams } from 'react-router-dom';

interface Props {}

const SearchResults: React.FC<Props> = () => {
  const { type } = useParams();

  return (
    <>
      <p>Showing search results for {type}</p>
    </>
  );
};

export default SearchResults;
