import { shade } from 'polished';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

interface NavbarMenuItemProps {
  $background?: boolean;
}

const dropdownAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  box-shadow: 0 4px 8px -8px rgba(0, 0, 0, 0.5);
  background-color: #fcfbff;

  h1 {
    color: #4680d2;
    font-weight: 700;
    font-size: 1.5rem;
    margin: 0;
  }
`;

export const NavbarMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  a + a {
    margin-left: 2rem;
  }
`;

export const NavbarMenuItem = styled(Link)<NavbarMenuItemProps>`
  color: #4680d2;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  transition: 0.2s all ease-in-out;
  &:hover {
    color: ${shade(0.2, '#4680d2')};
  }
  ${({ $background }) =>
    $background &&
    css`
      padding: 0.375rem 1.75rem;
      background-color: #4680d2;
      color: #fcfbff;
      border-radius: 27px;
      margin-left: 0.75rem !important;
      &:hover {
        background-color: ${shade(0.2, '#4680d2')};
        color: ${shade(0.2, '#fcfbff')};
      }
    `}
`;

export const NavbarMenuLoginSignUpContainer = styled.div`
  margin-left: 8%;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-left: 2rem;
  margin-right: 1rem;
  position: relative;
  color: #666568;
  cursor: pointer;
  h4 {
    font-weight: 400;
  }
  p {
    font-weight: 500;
    position: relative;
    span {
      position: absolute;
      width: 0;
      height: 0;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      border-top: 3px solid #000;
      top: 105%;
      left: 95%;
    }
  }
`;

export const DropdownContainer = styled.div`
  position: absolute;
  top: 62px;
  right: 0;
  width: 120px;
  border: 1px solid #d9d0f2;
  border-radius: 0 0 5px 5px;
  border-top: none;
  z-index: 1;
  animation: ${dropdownAnimation} 0.2s ease-in-out;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    a {
      font-size: 13px;
      font-weight: 500;
      margin: 0;
      text-decoration: none;
      color: #666568;
      transition: 0.1s all ease-in-out;
      width: 100%;
      padding: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    hr {
      width: 100%;
      border-color: rgba(0, 0, 0, 0.1);
    }
  }
`;
