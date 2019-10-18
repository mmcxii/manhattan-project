import React, { useState } from 'react';

import ModeSelection from './ModeSelection';

interface Props {}

const SearchForm: React.FC<Props> = () => {
  const [selection, setSelection] = useState<'' | 'beer' | 'wine' | 'cocktails'>('');

  return (
    <>
      {selection === '' && <ModeSelection setSelection={setSelection} />}
      {selection === 'beer'}
      {selection === 'wine'}
      {selection === 'cocktails'}
    </>
  );
};

export default SearchForm;
