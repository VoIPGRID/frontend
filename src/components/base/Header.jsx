import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';
import LinkButton from './LinkButton';

const Container = styled.header`
  background: white;
  text-align: center;
  position: absolute;
  left: 80px;
  right: 0;
  top: 0;
  height: 80px;
  line-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  margin: 20px;
  height: 40px;
  max-height: 40px;
`;

const NavRight = styled.div`
  position: absolute;
  right: 20px;
`;

// Header component to render the logo and the user preferences link.
const Header = () => (
  <Container>
    <Logo src={logo} alt="VoIPGRID logo" className="header--logo" />
    <NavRight>
      <LinkButton
        link="/user/personal_settings"
        addClasses="secondary pull-right"
      >
        <i className="fas fa-user" />
      </LinkButton>
    </NavRight>
  </Container>
);

export default Header;
