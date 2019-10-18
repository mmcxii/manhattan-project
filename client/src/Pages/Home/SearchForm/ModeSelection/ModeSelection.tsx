import React, { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from 'Store';
import { white, black, spacing, red, grey, elevation, transition } from 'Utilities';

interface Props {
  setSelection: React.Dispatch<React.SetStateAction<'' | 'beer' | 'wine' | 'cocktails'>>;
}

const ModeSelection: React.FC<Props> = ({ setSelection }) => {
  const { theme } = useContext(ThemeContext);

  const options: { name: 'beer' | 'wine' | 'cocktails'; icon: string }[] = [
    {
      name: 'beer',
      icon: 'fa-beer',
    },
    {
      name: 'wine',
      icon: 'fa-wine-glass-alt',
    },
    {
      name: 'cocktails',
      icon: 'fa-glass-martini-alt',
    },
  ];

  const makeSelection = (choice: 'beer' | 'wine' | 'cocktails') => {
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
            <IconWrapper>
              <Icon className={`fas ${option.icon}`} />
            </IconWrapper>
            <Option>{option.name}</Option>
          </OptionButton>
        ))}
      </Options>
    </>
  );
};

export default ModeSelection;

const IconWrapper = styled.div`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  font-size: 1.5rem;
  margin-bottom: ${spacing.sm};
  background: ${red};
  ${transition({ prop: 'box-shadow' })}
`;

const Icon = styled.i`
  color: ${white};
  filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.7));
`;

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

  ${IconWrapper} {
    border: 1px solid ${props => (props.theme === 'dark' ? black : grey)};
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

  &:hover {
    ${IconWrapper} {
      ${elevation[4]}
    }
  }
`;
