import React, { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from 'Store';
import { spacing, transition, white, red, black, elevation } from 'Utilities';

interface Props {
  icon: string;
}

export const Icon: React.FC<Props> = ({ icon }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper theme={theme}>
      <I className={icon} />
    </Wrapper>
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

const I = styled.i`
  color: ${white};
  filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.7));
`;
