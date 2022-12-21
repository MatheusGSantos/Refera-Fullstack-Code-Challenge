import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownContainer,
  NavbarContainer,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuLoginSignUpContainer,
  UserInfoContainer,
} from './styles';

import { useAuth } from '../../hooks/auth';

interface DropdownMenuProps {
  signOutCb: () => void;
}

function DropdownMenu({ signOutCb }: DropdownMenuProps) {
  return (
    <DropdownContainer>
      <div>
        <a href='/my-ads'>My Ads</a>
        <hr />
        <a href='/create-ad'>Create Ad</a>
        <hr />
        <a href='#' onClick={signOutCb}>
          Sign Out
        </a>
      </div>
    </DropdownContainer>
  );
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const container = useRef<HTMLDivElement>(null);

  const [dropDownActive, setDropDownActive] = useState(false);

  useEffect(() => {
    const handler = (event: any): void => {
      if (container.current && !container.current.contains(event.target)) {
        setDropDownActive(false);
      }
    };
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  });

  return (
    <NavbarContainer>
      <h1>Dashboard</h1>
      <NavbarMenu>
        {user ? (
          <UserInfoContainer ref={container} onClick={() => setDropDownActive(!dropDownActive)}>
            <h4>Welcome</h4>
            <p>
              {user.name} <span />
            </p>
            {dropDownActive && (
              <DropdownMenu
                signOutCb={() => {
                  signOut();
                  navigate('/');
                }}
              />
            )}
          </UserInfoContainer>
        ) : (
          <NavbarMenuLoginSignUpContainer>
            <NavbarMenuItem to='/login'>Login</NavbarMenuItem>
            <NavbarMenuItem to='/signup' $background>
              Sign Up
            </NavbarMenuItem>
          </NavbarMenuLoginSignUpContainer>
        )}
      </NavbarMenu>
    </NavbarContainer>
  );
};

export default Navbar;
