import React, { useEffect, useState } from 'react';
import './App.css';
import AppNavbar from './Navbar/AppNavbar';
import SessionCheck from './Security/SessionCheck';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';


const Home = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    let username = sessionStorage.getItem("username")
    setUser(username)
  },[])

  return (
    <div>
      <SessionCheck/>
      <AppNavbar/>
      <Container fluid>
      {user}
      </Container>
    </div>
  );
}

export default Home;