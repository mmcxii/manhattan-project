import React, { useContext } from 'react';
import styled from 'styled-components';

import { spacing, transition, white, green, black, grey } from 'Utilities';
import { ThemeContext } from '../../Store';

interface Props {
  name: string;
  accept?: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileInput: React.FC<Props> = (props: Props) => {
  const { name } = props;
  const { theme } = useContext(ThemeContext);

  const inputColor = theme === 'dark' ? black : white;
  const inputBgColor = theme === 'dark' ? white : grey;

  const InputLabel = styled.label`
    text-transform: capitalize;
  `;

  const Input = styled.input.attrs({ type: 'file' })`
    height: 0;
    width: 0;
    overflow: hidden;
    color: blue;
    background-color: blue;
    & + label {
      ${transition};
      color: ${inputColor};
      border: none;
      cursor: pointer;
      display: inline-block;
      margin-bottom: 1rem;
      outline: none;
      padding: ${spacing.sm} ${spacing.xl};
      position: relative;
      vertical-align: middle;
      background-color: ${inputBgColor};
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

  return (
    <>
      <Input id={name} {...props} />
      <InputLabel htmlFor={name}>{name}</InputLabel>
    </>
  );
};
