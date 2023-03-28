package com.myapp.restapi.researchconference.Restservice.Impl;

import com.myapp.restapi.researchconference.DAO.Interface.BidDAO;
import com.myapp.restapi.researchconference.DAO.Interface.PaperDAO;
import com.myapp.restapi.researchconference.DAO.Interface.ReviewDAO;
import com.myapp.restapi.researchconference.DAO.Interface.ReviewerDAO;
import com.myapp.restapi.researchconference.DTO.ReviewDTO;
import com.myapp.restapi.researchconference.Restservice.Interface.ReviewRestService;
import com.myapp.restapi.researchconference.entity.Admin.Userdetails;
import com.myapp.restapi.researchconference.entity.Bid.Bid;
import com.myapp.restapi.researchconference.entity.Paper.Paper;
import com.myapp.restapi.researchconference.entity.Review.Review;
import com.myapp.restapi.researchconference.entity.Review.Reviewer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
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
    public List<ReviewDTO> findMyReviews(int reviewerID) {
        List<Review> reviewList = reviewDAO.findMyReviews(reviewerID);
        return ReviewDTO.DTOList(reviewList);
    }

    @Override
    @Transactional
    public Optional<Review> findReviewByID(int reviewID) {
        return reviewDAO.findReviewByID(reviewID);
    }

    @Override
    public List<ReviewDTO> findReviewsByPaperID(int paperID) {
        List<Review> reviewList = reviewDAO.findReviewsByPaperID(paperID);
        return ReviewDTO.DTOList(reviewList);
    }

    @Override
    @Transactional
    public Review addReview(Review review) {
        Date currentTime = new Date();
        review.setReviewDate(currentTime);
        Optional<Bid> bid = bidDAO.findBidByID(review.getBid().getBidID());
        boolean success = false;
        if (bid.isPresent()){
            review.setBid(bid.get());

            review =  reviewDAO.addReview(review);
            success = bidDAO.completeBid(review.getBid().getBidID());
            if (success)
                return review;
        }

        return null;
    }
}
