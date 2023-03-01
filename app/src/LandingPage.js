import React, { useEffect, useState } from 'react';
import './App.css';
import AppNavbar from './Navbar/AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';


const LandingPage = () => {

  return (
    <div>
      <Container fluid>
        <br />
        <h2>My Landing Page</h2>
        <hr />
        <Button color="link"><Link to="/login">Login</Link></Button>
      </Container>
    </div>
  );
}

export default LandingPage;