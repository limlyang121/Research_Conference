package com.myapp.restapi.researchconference.rest;

import com.myapp.restapi.researchconference.DTO.BidDTO;
import com.myapp.restapi.researchconference.Restservice.Interface.BidRestService;
import com.myapp.restapi.researchconference.entity.Bid.Bid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:3000")
public class BidRest {
    private final BidRestService bidRestService;

    @Autowired
    public BidRest(BidRestService bidRestService) {
        this.bidRestService = bidRestService;
    }

    @GetMapping("bids/{status}")
    public List<BidDTO> findAllBidsByStatus(@PathVariable String status){
        return bidRestService.findAllBidByStatus(status);
    }

    @GetMapping("bids/{reviewerID}/{status}")
    public List<BidDTO> findMyBidByStatus(@PathVariable int reviewerID, @PathVariable String status){
        return bidRestService.findMyBidByStatus(reviewerID, status);
    }

    @PostMapping("bids")
    public ResponseEntity<String> addBids(@RequestBody Bid bid) {
        BidDTO temp = bidRestService.addBid(bid);
        if (temp != null)
            return ResponseEntity.ok("Successfully bid the Paper");
        else
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to bid the paper");
    }

    @DeleteMapping("bids/{bidID}")
    public ResponseEntity<String> deleteBids(@PathVariable int bidID) {
        boolean success = bidRestService.deleteBid(bidID);
        if (success)
            return ResponseEntity.ok("Successfully Unbid");
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Fail to unbid");
    }

    @PatchMapping("bids/accept/{bidID}")
    public ResponseEntity<String> acceptBids(@PathVariable int bidID){
        boolean success = bidRestService.acceptBid(bidID);
        if (success)
            return ResponseEntity.ok("Successfully Accept the bid");
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bid Can't be found");

    }

    @PatchMapping("bids/accept/{bidID}")
    public ResponseEntity<String> rejectBid(@PathVariable int bidID){
        boolean success = bidRestService.rejectBid(bidID);
        if (success)
            return ResponseEntity.ok("Successfully Reject the bid");
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bid Can't be found");

    }

}
