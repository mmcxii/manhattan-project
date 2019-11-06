import React from 'react';

import styled from 'styled-components';
import { spacing } from 'Utilities';

interface Ingredient {
  _id: string;
  name: string;
  measurement: string;
}

interface Props {
  ingredients?: Ingredient[];
}

const IngredientTable = styled.table`
  margin: ${spacing.xs} 0;
`;

const Spacer = styled.span`
  margin: 0 ${spacing.xs};
`;

export const ProductIngredients: React.FC<Props> = ({ ingredients }) => {
  if (!ingredients || ingredients.length === 0) {
    return <p>Not specified.</p>;
  }

  return (
    <IngredientTable>
      <tbody>
        {ingredients.map(ingredient => (
          <tr key={ingredient._id}>
            <td>{ingredient.measurement}</td>
            <td>
              <Spacer />
            </td>
            <td>{ingredient.name}</td>
          </tr>
        ))}
      </tbody>
    </IngredientTable>
  );
};
