import React from 'react';

import Nav from './Nav';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <header>
      header
      <Nav />
    </header>
  );
};

export default Header;
