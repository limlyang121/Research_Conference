package com.myapp.restapi.researchconference.Restservice.Interface;

import com.myapp.restapi.researchconference.entity.Bid.Bid;

import java.util.List;

public interface BidRestService {
    List<Bid> findAll();

    Bid addBid(Bid bid);
}
