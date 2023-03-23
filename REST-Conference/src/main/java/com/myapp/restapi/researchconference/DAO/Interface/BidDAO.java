package com.myapp.restapi.researchconference.DAO.Interface;

import com.myapp.restapi.researchconference.entity.Bid.Bid;

import java.util.List;

public interface BidDAO {
    List<Bid> findAllBidsByStatus(String Status);

    List<Bid> findMyBidByStatus(int reviewerID, String status);

    List<Bid> findMyAcceptedBid(int reviewerID);

    boolean hideBid(int bidID);
    Bid addBid(Bid bid);

    boolean deleteBid(int bidID);

    boolean acceptBid(int bidID);
    boolean rejectBid(int bidID);

    boolean completeBid(int bidID);

    boolean cancelBid(int bidID);

}
