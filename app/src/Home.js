import React, { useEffect, useState } from 'react';
import './App.css';
import "./Home.css"
import AppNavbar from './Navbar/AppNavbar';


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
        <img src="/img/background.png" alt='' className='backgroundImage' />
        <div className='welcomeText'>
          Welcome {user}
        </div>
      </div>
    </div>
  );
}

export default Home;