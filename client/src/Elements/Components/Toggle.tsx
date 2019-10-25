import React, { useState } from 'react';
import styled from 'styled-components';
import { white, spacing, red, green, transition } from 'Utilities';

interface Props {
  name: string;
  trueCondition: string;
  falseCondition: string;
  initialState: boolean;
  setStateAction: any;
}

export const Toggle: React.FC<Props> = ({
  name,
  trueCondition,
  falseCondition,
  initialState,
  setStateAction,
}) => {
  const [toggled, setToggled] = useState<boolean>(initialState);

  const handleToggle = () => {
    setToggled(!toggled);

    if (toggled) {
      setStateAction(falseCondition);
    } else {
      setStateAction(trueCondition);
    }
  };

  return (
    <Wrapper>
      <Label htmlFor={name}>{name}</Label>
      <Checkbox name={name} checked={toggled} onChange={handleToggle} />
      <ToggleOutter toggled={toggled} onClick={handleToggle}>
        <ToggleInner />
      </ToggleOutter>
      <DisplayValue>{toggled ? trueCondition : falseCondition}</DisplayValue>
    </Wrapper>
  );
};

const Label = styled.label`
  grid-area: label;

  display: block;
  text-transform: capitalize;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  height: 0;
  width: 0;
`;

const ToggleInner = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: ${white};
`;

const ToggleOutter = styled.div<{ toggled: boolean }>`
  grid-area: toggle;

  cursor: pointer;
  display: inline-block;
  background: ${props => (props.toggled ? green : red)};
  width: 60px;
  border-radius: 30px;
  padding: ${spacing.xs};

  ${ToggleInner} {
    margin-left: ${props => (props.toggled ? '22px' : '')};
    ${transition({ prop: 'margin' })}
  }
`;

const DisplayValue = styled.span`
  grid-area: display-value;

  text-transform: capitalize;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-template-rows: repeat(2, max-content);
  grid-template-areas: 'label label' 'toggle display-value';
  grid-gap: ${spacing.xs};
  align-items: center;
`;
