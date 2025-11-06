import React from 'react';
import HeaderBar from '../components/HeaderBar';
import { Container } from 'react-bootstrap';

const HomePage = () => {
  return (
    <>
      <HeaderBar />
      <Container>
        <h3>Welcome to TuitionTracker</h3>
        <p>Use the menu to view payments.</p>
      </Container>
    </>
  );
};

export default HomePage;
