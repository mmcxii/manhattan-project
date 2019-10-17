import React, { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from 'Store';
import { spacing, black, white } from 'Utilities';
import Container from '../Container';
import TeamMembers from './TeamMembers';
import ProjectInfo from './ProjectInfo';

interface Props {}

const Footer: React.FC<Props> = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper>
      <FooterContainer>
        <Byline theme={theme}>
          Team Taco &copy;2019 <br /> All rights reserved.
        </Byline>

        <TeamMembers />
        <ProjectInfo />
      </FooterContainer>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  margin-top: auto;
  padding: ${spacing.md} 0;
`;

const FooterContainer = styled(Container)`
  display: grid;
  grid-template-rows: repeat(3, max-content);
  grid-template-areas: 'byline' 'team-members' 'project-info';
  grid-row-gap: ${spacing.lg};
  grid-column-gap: ${spacing.xl};
  justify-content: center;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, max-content);
    grid-template-areas: 'byline byline' 'team-members project-info';
    grid-row-gap: ${spacing.sm};
  }
`;

const Byline = styled.p<{ theme: string }>`
  grid-area: byline;

  text-align: center;
  font-style: italic;
  padding: ${spacing.xs};
  border-bottom: 1px solid ${props => (props.theme === 'dark' ? white : black)};

  @media screen and (min-width: 768px) {
    border: none;
  }
`;
