import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './Admin/UserList';
import UserEdit from './Admin/UserEdit';
import UserRead from './Admin/UserRead';
import Login from "./General/Login"



const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path='/users' exact={true} element={<UserList/>}/>
        <Route path='/users/form/:id' element={<UserEdit/>}/>
        <Route path='/users/read/:id' element={<UserRead/>}/>
        <Route path='/login' element={<Login/>} />

      </Routes>
    </Router>
  )
}
export default App;