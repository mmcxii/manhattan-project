import React, { useContext } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';

import { ThemeContext } from 'Store';
import { white, black, spacing, grey, elevation } from 'Utilities';
import { Icon } from 'Elements';

interface Props {
  setSelection: React.Dispatch<React.SetStateAction<'' | 'beer' | 'wine' | 'cocktail'>>;
}

const ModeSelection: React.FC<Props> = ({ setSelection }) => {
  const { theme } = useContext(ThemeContext);

  const options: { name: 'beer' | 'wine' | 'cocktail'; icon: string }[] = [
    {
      name: 'beer',
      icon: 'fa-beer',
    },
    {
      name: 'wine',
      icon: 'fa-wine-glass-alt',
    },
    {
      name: 'cocktail',
      icon: 'fa-glass-martini-alt',
    },
  ];

  const makeSelection = (choice: 'beer' | 'wine' | 'cocktail') => {
    setSelection(choice);
  };

  return (
    <>
      <p>
        Welcome to The Manhattan Project! A social experience for all of your favorite poisons. Click a button
        below to begin.
      </p>

      <Options theme={theme}>
        {options.map(option => (
          <OptionButton onClick={() => makeSelection(option.name)} key={`${option.name}-button`}>
            <Overdrive id={`${option.name}-icon`}>
              <Icon icon={`fas ${option.icon}`} />
            </Overdrive>
            <Option>{option.name}</Option>
          </OptionButton>
        ))}
      </Options>
    </>
  );
};

export default ModeSelection;

const Option = styled.span`
  text-transform: capitalize;
`;

const Options = styled.section<{ theme: string }>`
  display: flex;
  justify-content: space-evenly;
  padding: ${spacing.md};

  > * {
    color: ${props => (props.theme === 'dark' ? white : black)};
  }
`;

const OptionButton = styled.button`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
`;
