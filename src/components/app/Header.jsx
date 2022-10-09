import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserComponent from '../header/UserComponent';

const logo = require('../../assets/Flamingo_LogoText.png');

const HeaderDiv = styled.div`
  height: 4rem;
`;

const Header = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/investments');
  };

  return (
    <HeaderDiv className="w-full flex justify-between items-center">
      <div onClick={goHome} className="cursor-pointer">
        <img width={156} src={logo} alt="Flamingo" />
      </div>
      <UserComponent />
    </HeaderDiv>
  );
};

export default Header;
