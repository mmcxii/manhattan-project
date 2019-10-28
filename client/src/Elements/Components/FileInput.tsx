import React from 'react';
import styled from 'styled-components';

import { spacing, transition, white, green, black, rounded } from 'Utilities';

interface Props {
  name: string;
  accept?: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputLabel = styled.label`
  text-transform: capitalize;
`;

const Input = styled.input.attrs({ type: 'file' })`
  height: 0;
  width: 0;
  overflow: hidden;
  & + label {
    ${transition};
    color: ${black};
    border: none;
    cursor: pointer;
    display: inline-block;
    margin-bottom: 1rem;
    outline: none;
    padding: ${spacing.sm} ${spacing.xl};
    position: relative;
    vertical-align: middle;
    background-color: ${white};
    border-radius: ${rounded};
    overflow: hidden;
    :hover {
      background-color: ${green};
    }
    :active {
      background-color: ${white};
      color: ${green};
    }
  }
`;

export const FileInput: React.FC<Props> = (props: Props) => {
  const { name } = props;

  return (
    <>
      <Input id={name} {...props} />
      <InputLabel htmlFor={name}>{name}</InputLabel>
    </>
  );
};
