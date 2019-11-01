import React from 'react';
import { ProductProps, MixedProps } from '../SearchForm';

interface Props {
  item: ProductProps<MixedProps>;
}

const MixedDetails: React.FC<Props> = ({ item }) => {
  console.log(item);
  return (
    <>
      <p>{item.details.glassType}</p>
      <p>{item.details.directions}</p>
    </>
  );
};
export default MixedDetails;
