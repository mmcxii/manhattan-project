import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from 'Store';
import { white, spacing, black } from 'Utilities';

interface Props {}

const NavDropdown: React.FC<Props> = () => {
  const { theme } = useContext(ThemeContext);
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);
  const navDropdown: { closedIcon: 'fas fa-sort-down'; openedIcon: 'fas fa-sort-up'; options: [] } = {
    closedIcon: 'fas fa-sort-down',
    openedIcon: 'fas fa-sort-up',
    options: []
  };

  return (
    <Wrapper theme={theme}>
      <i className={dropdownIsOpen ? navDropdown.openedIcon : navDropdown.closedIcon} />
    </Wrapper>
  );
};

export default NavDropdown;

const DropdownToggle = styled.button`
  background: transparent;
  border: none;
`;

const Wrapper = styled.li<{ theme: 'dark' | 'light' }>`
  color: ${white};

  @media screen and (min-width: 768px) {
    padding: 0 ${spacing.md};
    color: ${props => (props.theme === 'dark' ? white : black)};

    &:not(:last-child) {
      border-right: 2px solid ${props => (props.theme === 'dark' ? white : black)};
    }
  }
`;
