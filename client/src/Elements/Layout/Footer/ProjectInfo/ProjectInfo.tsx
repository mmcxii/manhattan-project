import React from 'react';

import InfoItem from './InfoItem';

interface Props {}

const ProjectInfo: React.FC<Props> = () => {
  const infoItems: { name: string; link: string; icon: string }[] = [
    {
      name: 'source code',
      link: 'https://github.com/mmcxii/manhattan-project',
      icon: 'fab fa-github',
    },
    {
      name: 'Brewery DB',
      link: 'https://www.brewerydb.com/',
      icon: 'fas fa-beer',
    },
    {
      name: 'The CocktailDB',
      link: 'https://www.thecocktaildb.com/api.php',
      icon: 'fas fa-glass-martini-alt',
    },
    {
      name: 'quini wine',
      link: 'https://quiniwine.com/developers',
      icon: 'fas fa-wine-glass-alt',
    },
  ];

  return (
    <div>
      <h4>About The Manhattan Project</h4>

      <ul>
        {infoItems.map(item => (
          <InfoItem key={item.name} {...item} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectInfo;
