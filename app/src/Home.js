import React, { useEffect, useState } from 'react';
import './App.css';
import "./Home.css"
import AppNavbar from './Navbar/AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';


const Home = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    let username = sessionStorage.getItem("username")
    setUser(username)
  }, [])

  return (
    <div>
      <AppNavbar />
      <div className='welcome-container' >
        <img src="/img/background.png" alt='Image Desc' className='backgroundImage' />
        <div className='welcomeText'>
          Welcome {user}
        </div>
      </div>
    </div>
  );
}

export default Home;