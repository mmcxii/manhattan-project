import React from 'react';
import styled from 'styled-components';

import InfoItem from './InfoItem';
import { spacing } from 'Utilities';

interface Props {}

const ProjectInfo: React.FC<Props> = () => {
  const infoItems: { name: string; link: string; icon: string }[] = [
    {
      name: 'source code',
      link: 'https://github.com/mmcxii/manhattan-project',
      icon: 'fab fa-github'
    },
    {
      name: 'Brewery DB',
      link: 'https://www.brewerydb.com/',
      icon: 'fas fa-beer'
    },
    {
      name: 'The CocktailDB',
      link: 'https://www.thecocktaildb.com/api.php',
      icon: 'fas fa-glass-martini-alt'
    }
  ];

  return (
    <Wrapper>
      <Title>
        <i className='far fa-glass-martini-alt' /> The Manhattan Project
      </Title>

      <List>
        {infoItems.map(item => (
          <InfoItem key={item.name} {...item} />
        ))}
      </List>
    </Wrapper>
  );
};

export default ProjectInfo;

const Wrapper = styled.div`
  grid-area: project-info;
`;

const Title = styled.h4`
  text-transform: uppercase;
`;

const List = styled.ul`
  list-style: none;
  display: grid;
  grid-gap: ${spacing.xs};
`;
