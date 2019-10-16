import React from 'react';

import TeamMember from './TeamMember';

interface Props {}

const TeamMembers: React.FC<Props> = () => {
  const teamMembers: { name: string; github: string; linkedIn: string; portfolio: string }[] = [
    {
      name: 'john remeto',
      github: 'https://github.com/Remet0',
      linkedIn: 'https://www.linkedin.com/in/john-remeto-317806137',
      portfolio: 'http://johnremeto.com/',
    },
    {
      name: 'austin robbins',
      github: 'https://github.com/Jirafaro',
      linkedIn: 'https://www.linkedin.com/in/austin-robbins-20084589/',
      portfolio: 'https://jirafaro.github.io/updatedPortfolio/',
    },
    {
      name: 'zach murphy',
      github: 'https://github.com/Munch-Z',
      linkedIn: 'https://www.linkedin.com/in/zachary-murphy-20a610156/',
      // TODO: bug zach for info
      portfolio: '',
    },
    {
      name: 'nich secord',
      github: 'https://github.com/mmcxii',
      linkedIn: 'https://www.linkedin.com/in/nichsecord/',
      portfolio: 'https://secord.io',
    },
    {
      name: 'brandt strom',
      github: 'https://github.com/brandtkstrom',
      linkedIn: 'https://www.linkedin.com/in/brandtstrom/',
      portfolio: 'https://brandtkstrom.github.io/Portfolio/portfolio.html',
    },
  ];

  return (
    <div>
      <h4>Meet the team</h4>

      <ul>
        {teamMembers.map(member => (
          <TeamMember key={member.name} {...member} />
        ))}
      </ul>
    </div>
  );
};

export default TeamMembers;
