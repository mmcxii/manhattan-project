import React, { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from 'Store';
import { spacing, transition, green, white, red, black, elevation, rounded } from 'Utilities';

interface Props {
  icon: string;
  onClick?: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Icon: React.FC<Props> = ({ icon }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper theme={theme}>
      <I className={icon} />
    </Wrapper>
  );
};

export const IconButton: React.FC<Props> = (props: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <ButtonWrapper theme={theme} onClick={props.onClick}>
      <BtnI className={props.icon} /> Upload
    </ButtonWrapper>
  );
};

const Wrapper = styled.div<{ theme: string }>`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  font-size: 1.5rem;
  margin-bottom: ${spacing.sm};
  background: ${red};
  border: 1px solid ${props => (props.theme === 'dark' ? white : black)};
  ${transition({ prop: 'box-shadow' })};

  &:hover {
    ${elevation[4]}
  }
`;

const ButtonWrapper = styled.button<{ theme: string }>`
  ${transition({})};
  display: inline-block;
  position: relative;
  vertical-align: middle;
  border: none;
  padding: ${spacing.sm} ${spacing.xl};
  margin: ${spacing.sm} 0;
  border-radius: ${rounded};
  cursor: pointer;
  color: ${black};
  background-color: ${white};
  outline: none;
  :hover {
    background-color: ${green};
  }
  :active {
    background-color: ${white};
    color: ${green};
  }
`;

const I = styled.i`
  color: ${white};
  filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.7));
`;

const BtnI = styled.i`
  color: ${black};
`;
