import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import UserList from './Admin/UserList';
import UserEdit from './Admin/UserEdit';
import UserRead from './Admin/UserRead';
import RoleList from "./Admin/ProfileList"
import RoleEdit from "./Admin/ProfileEdit"

import Login from "./General/Login"
import LandingPage from './LandingPage';
import PaperEdit from "./Author/PaperEdit"
import PaperList from './Author/PaperList';
import PaperRead from './Author/PaperRead';
import ReviewerBid from './Reviewer/ReviewerBid';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path='/login' element={<Login />} />

        {/* Login */}
        <Route path='/home' exact={true} element={<Home />} />

        {/* Admin */}
        <Route path='/admin/users' exact={true} element={<UserList />} />
        <Route path='/admin/users/form/:id' element={<UserEdit />} />
        <Route path='/admin/users/read/:id' element={<UserRead />} />
        <Route path='/admin/roles' element={<RoleList />} />
        <Route path='/admin/roles/form/:name' element={<RoleEdit />} />



        {/* Auhor */}
        <Route path='/author/papers/form/:id' exact={true} element={<PaperEdit />} />
        <Route path='/author/papers/mypapers/:id' exact={true} element={<PaperList />} />
        <Route path='/author/papers/read/:id' exact={true} element={<PaperRead />} />


        {/* Reviewer */}
        <Route path='/reviewer/bid' exact={true} element={<ReviewerBid />} />

      </Routes>
    </Router>
  )
}
export default App;