import React from 'react';

interface Props {
  name: string;
  link: string;
  icon: string;
}

const InfoItem: React.FC<Props> = ({ name, link, icon }) => (
  <li>
    <a href={link} target='blank'>
      <i className={icon} />
      {name}
    </a>
  </li>
);

export default InfoItem;
