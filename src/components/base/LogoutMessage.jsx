import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  background: white;
  margin: auto;
  padding: 1rem;
  border-radius: 4px;
`;

// Logout message component to show a user is succesfully logged out.
const LogoutMessage = () => (
  <Container>
    <h1>Logged out</h1>
    <p>You are now logged out.</p>
    <p>
      <NavLink to="/login">Log in again</NavLink>
    </p>
  </Container>
);

export default LogoutMessage;
