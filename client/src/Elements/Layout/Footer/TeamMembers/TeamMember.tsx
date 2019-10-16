import React from 'react';

interface Props {
  name: string;
  github: string;
  linkedIn: string;
  portfolio: string;
}

const TeamMember: React.FC<Props> = ({ name, github, linkedIn, portfolio }) => (
  <li>
    {name}
    <a href={github} target='blank'>
      <i className='fab fa-github' />
    </a>
    <a href={linkedIn} target='blank'>
      <i className='fab fa-linkedin-in' />
    </a>
    <a href={portfolio} target='blank'>
      <i className='fas fa-browser' />
    </a>
  </li>
);

export default TeamMember;
