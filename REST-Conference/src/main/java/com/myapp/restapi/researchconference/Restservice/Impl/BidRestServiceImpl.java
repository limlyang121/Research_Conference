package com.myapp.restapi.researchconference.Restservice.Impl;

import com.myapp.restapi.researchconference.DAO.Interface.BidDAO;
import com.myapp.restapi.researchconference.DAO.Interface.PaperDAO;
import com.myapp.restapi.researchconference.DAO.Interface.ReviewerDAO;
import com.myapp.restapi.researchconference.Restservice.Interface.BidRestService;
import com.myapp.restapi.researchconference.entity.Bid.Bid;
import com.myapp.restapi.researchconference.entity.Paper.Paper;
import com.myapp.restapi.researchconference.entity.Review.Reviewer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BidRestServiceImpl implements BidRestService {

    private final BidDAO bidDAO;
    private final ReviewerDAO reviewerDAO;
    private final PaperDAO paperDAO;

    @Autowired
    public BidRestServiceImpl(BidDAO bidDAO, ReviewerDAO reviewerDAO, PaperDAO paperDAO) {
        this.bidDAO = bidDAO;
        this.reviewerDAO = reviewerDAO;
        this.paperDAO = paperDAO;
    }

    @Override
    public List<Bid> findAll() {
        return null;
    }

    @Override
    @Transactional
    public Bid addBid(Bid bid) {
        Optional<Paper> paperOptional = paperDAO.findPaperByID(bid.getPaper().getPaperID());
        Optional<Reviewer> reviewerOptional = reviewerDAO.findByID(bid.getReviewer().getReviewerID());
        if (paperOptional.isPresent() && reviewerOptional.isPresent()){
            bid.setPaper(paperOptional.get());
            bid.setReviewer(reviewerOptional.get());
            bid.setStatus("Pending");
            return bidDAO.addBid(bid);
        }
        return null;
    }
}
