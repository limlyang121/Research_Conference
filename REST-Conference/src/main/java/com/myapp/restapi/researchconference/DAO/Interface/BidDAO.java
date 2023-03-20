package com.myapp.restapi.researchconference.DAO.Interface;

import com.myapp.restapi.researchconference.entity.Bid.Bid;

import java.util.List;

public interface BidDAO {
    List<Bid> findAll();

    boolean hideBid(int bidID);
    Bid addBid(Bid bid);

    boolean deleteBid(int bidID);
}
