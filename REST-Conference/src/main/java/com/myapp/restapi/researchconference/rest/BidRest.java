package com.myapp.restapi.researchconference.rest;

import com.myapp.restapi.researchconference.Restservice.Interface.BidRestService;
import com.myapp.restapi.researchconference.entity.Bid.Bid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:3000")
public class BidRest {
    private final BidRestService bidRestService;

    @Autowired
    public BidRest(BidRestService bidRestService) {
        this.bidRestService = bidRestService;
    }

    @PostMapping("bids")
    public ResponseEntity<String> addBids(@RequestBody Bid bid){
        Bid temp = bidRestService.addBid(bid);
        if (temp == null)
            return ResponseEntity.ok("Successfully bid the Paper");
        else
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to bid the paper");
    }

}
