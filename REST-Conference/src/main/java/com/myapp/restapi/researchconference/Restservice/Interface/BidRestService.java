package com.myapp.restapi.researchconference.Restservice.Interface;

import com.myapp.restapi.researchconference.DTO.BidDTO;
import com.myapp.restapi.researchconference.entity.Bid.Bid;

import java.util.List;

public interface BidRestService {
    List<Bid> findAll();

    List<BidDTO> findMyBidByStatus(int reviewerID, String status);

    BidDTO addBid(Bid bid);
    boolean deleteBid(int bidID);
}
