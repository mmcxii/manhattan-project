import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ThemeContext } from 'Store';
import { white, black, spacing } from 'Utilities';
import { Icon } from 'Elements';

interface Props {}

const ModeSelection: React.FC<Props> = () => {
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

  return (
    <>
      <p>
        Welcome to The Manhattan Project! A social experience for all of your favorite poisons. Click a button
        below to begin.
      </p>

      <Options theme={theme}>
        {options.map(option => (
          <OptionButton to={`/search/${option.name}`} key={`${option.name}-button`}>
            <Icon icon={`fas ${option.icon}`} />
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

const OptionButton = styled(Link)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
`;
