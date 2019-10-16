import React from 'react';
import styled from 'styled-components';

import { spacing } from 'Utilities';
import Container from '../Container';
import TeamMembers from './TeamMembers';
import ProjectInfo from './ProjectInfo';

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <Wrapper>
      <FooterContainer>
        <Byline>
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
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const FooterContainer = styled(Container)``;

const Byline = styled.p`
  font-style: italic;
`;
