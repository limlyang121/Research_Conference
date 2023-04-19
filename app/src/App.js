import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import ReviewerBidStatus from './Reviewer/ReviewerBidStatus';
import AccessDenied from './Security/Access-Denied';
import ConferenceReviewerBid from './ConferenceChair/ConferenceReviewerBid';
import ReviewerReview from './Reviewer/ReviewerReviewList';
import ReviewerReviewForm from './Reviewer/ReviewerReviewForm';
import PaperReview from './Author/PaperReview';
import ConferencePaperList from './ConferenceChair/ConferencePaperList';
import ConferenceCheckReviewerBidProcess from './ConferenceChair/ConferenceCheckReviewerBidProcess';
import ConferenceAllReviewerBid from './ConferenceChair/ConferenceAllPaperReviews';


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
        <Route path='/author/papers/:id/review' exact={true} element={<PaperReview />} />




        {/* Reviewer */}
        <Route path='/reviewer/bid/' exact={true} element={<ReviewerBid />} />
        <Route path='/reviewer/mybids' exact={true} element={<ReviewerBidStatus />} />
        <Route path='/reviewer/reviews' exact={true} element={<ReviewerReview />} />
        <Route path='/reviewer/review/:id/:status' exact={true} element={<ReviewerReviewForm />} />
        

        {/* Conference Chaiar */}
        <Route path='/conference/bids' exact={true} element={<ConferenceReviewerBid />} />
        <Route path='/conference/papers/ready' exact={true} element={<ConferencePaperList />} />
        <Route path='/conference/papers/:id/reviews' exact={true} element={<ConferenceAllReviewerBid />} />
        <Route path='/conference/papers/:id/bids' exact={true} element={<ConferenceCheckReviewerBidProcess />} />



        {/* Access Denied */}
        <Route path='/denied' exact={true} element={<AccessDenied />} />



      </Routes>
    </Router>
  )
}
export default App;