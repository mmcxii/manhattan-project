import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ThemeContext, UserContext } from 'Store';
import { white, spacing, black, transition, blackDark, whiteLight } from 'Utilities';

interface Props {}

const DropdownMenu: React.FC<Props> = () => {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);
  const navDropdown: {
    icon: 'fas fa-sort-down';
    options: { icon: string; name: string; path: string }[];
  } = {
    icon: 'fas fa-sort-down',
    options: [
      {
        name: 'edit user info',
        icon: 'fa-user-edit',
        path: `/edit/${user.username}`
      },
      {
        name: 'log out',
        icon: 'fa-sign-out',
        path: '/logout'
      }
    ]
  };

  const toggleMenu = () => setDropdownIsOpen(!dropdownIsOpen);

  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  useEffect(() => {
    const handleClick = (e: any) => {
      //@ts-ignore
      if (menuRef.current.contains(e.target) || toggleRef.current.contains(e.target)) {
        return;
      }

      setDropdownIsOpen(false);
    };

    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <Wrapper theme={theme}>
      <DropdownToggle onClick={toggleMenu} ref={toggleRef}>
        <i className={navDropdown.icon} />
      </DropdownToggle>

      <Menu toggle={dropdownIsOpen} theme={theme} ref={menuRef}>
        {navDropdown.options.map(item => (
          <MenuItem key={item.name}>
            <Link to={item.path} onClick={() => setDropdownIsOpen(false)}>
              <Icon className={`far ${item.icon}`} />
              <Text>{item.name}</Text>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Wrapper>
  );
};

export default DropdownMenu;

const Text = styled.span`
  grid-area: text;
`;

const Icon = styled.i`
  grid-area: icon;
`;

const MenuItem = styled.li`
  > a {
    display: grid;
    grid-template-columns: 16px max-content;
    grid-template-areas: 'icon text';
    grid-gap: ${spacing.sm};
    text-decoration: none;
  }
  margin: ${spacing.xs} 0;
`;

const Menu = styled.ul<{ toggle: boolean; theme: 'dark' | 'light' }>`
  width: 60vw;
  position: absolute;
  top: 40px;
  left: 0;
  list-style: none;
  text-align: left;
  background: ${props => (props.theme === 'dark' ? blackDark : whiteLight)};
  padding: ${spacing.md};
  text-transform: capitalize;
  opacity: ${props => (props.toggle ? 1 : 0)};
  transform: scaleY(${props => (props.toggle ? 1 : 0)});
  transform-origin: top;
  ${transition({ prop: 'transform' })};

  @media screen and (min-width: 768px) {
    opacity: initial;
    width: 10vw;
    top: 210%;
  }
`;

const DropdownToggle = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
`;

const Wrapper = styled.div<{}>`
  grid-area: dropdown;
  color: ${props => (props.theme === 'dark' ? white : black)};

  > ${DropdownToggle} {
    color: inherit;

    > svg {
      color: inherit;
    }
  }

  @media screen and (min-width: 768px) {
    position: relative;

    &:not(:last-child) {
      border-right: 2px solid ${props => (props.theme === 'dark' ? white : black)};
    }
  }
`;
