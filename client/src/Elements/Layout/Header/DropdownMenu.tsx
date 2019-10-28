import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from 'Store';
import { white, spacing, black } from 'Utilities';

interface Props {}

const DropdownMenu: React.FC<Props> = () => {
  const { theme } = useContext(ThemeContext);
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);
  const navDropdown: { closedIcon: 'fas fa-sort-down'; openedIcon: 'fas fa-sort-up'; options: [] } = {
    closedIcon: 'fas fa-sort-down',
    openedIcon: 'fas fa-sort-up',
    options: [
      // TODO: Edit User Info
      // TODO: Log Out
    ]
  };

  return (
    <Wrapper theme={theme}>
      <DropdownToggle>
        <i className={dropdownIsOpen ? navDropdown.openedIcon : navDropdown.closedIcon} />
      </DropdownToggle>
    </Wrapper>
  );
};

export default DropdownMenu;

const DropdownToggle = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
`;

const Wrapper = styled.div<{ theme: 'dark' | 'light' }>`
  grid-area: dropdown;

  > ${DropdownToggle} {
    color: inherit;

    > svg {
      color: inherit;
    }
  }

  @media screen and (min-width: 768px) {
    padding: 0 ${spacing.md};
    color: ${props => (props.theme === 'dark' ? white : black)};

    &:not(:last-child) {
      border-right: 2px solid ${props => (props.theme === 'dark' ? white : black)};
    }
  }
`;
