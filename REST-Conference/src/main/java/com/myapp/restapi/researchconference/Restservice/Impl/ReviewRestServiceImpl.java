package com.myapp.restapi.researchconference.Restservice.Impl;

import com.myapp.restapi.researchconference.DAO.Interface.BidDAO;
import com.myapp.restapi.researchconference.DAO.Interface.PaperDAO;
import com.myapp.restapi.researchconference.DAO.Interface.ReviewDAO;
import com.myapp.restapi.researchconference.DAO.Interface.ReviewerDAO;
import com.myapp.restapi.researchconference.Restservice.Interface.ReviewRestService;
import com.myapp.restapi.researchconference.entity.Admin.Userdetails;
import com.myapp.restapi.researchconference.entity.Paper.Paper;
import com.myapp.restapi.researchconference.entity.Review.Review;
import com.myapp.restapi.researchconference.entity.Review.Reviewer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

@Service
public class ReviewRestServiceImpl implements ReviewRestService {
    private final ReviewDAO reviewDAO;
    private final PaperDAO paperDAO;
    private final ReviewerDAO reviewerDAO;
    private final BidDAO bidDAO;

    public ReviewRestServiceImpl(ReviewDAO reviewDAO, PaperDAO paperDAO, ReviewerDAO reviewerDAO, BidDAO bidDAO) {
        this.reviewDAO = reviewDAO;
        this.paperDAO = paperDAO;
        this.reviewerDAO = reviewerDAO;
        this.bidDAO = bidDAO;
    }

    @Override
    @Transactional
    public Review addReview(Review review) {
        Date currentTime = new Date();
        review.setReviewDate(currentTime);
        Optional<Paper> paper = paperDAO.findPaperByID(review.getPaper().getPaperID());
        Optional<Reviewer> reviewer = reviewerDAO.findByUserID(review.getReviewer().getReviewerID());

        if (paper.isPresent() && reviewer.isPresent()){
            review.setReviewer(reviewer.get());
            review.setPaper(paper.get());
            review = reviewDAO.addReview(review);
            

        }else
            return null;
    }
}
