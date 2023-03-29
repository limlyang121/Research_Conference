package com.myapp.restapi.researchconference.rest;

import com.myapp.restapi.researchconference.DTO.ReviewDTO;
import com.myapp.restapi.researchconference.Restservice.Interface.ReviewRestService;
import com.myapp.restapi.researchconference.entity.Review.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewRest {
    private final ReviewRestService reviewRestService;

    @Autowired
    public ReviewRest(ReviewRestService reviewRestService) {
        this.reviewRestService = reviewRestService;
    }



    @GetMapping("reviews/myreviews/{reviewerID}")
    public List<ReviewDTO> findMyReviews(@PathVariable int reviewerID){
        return reviewRestService.findMyReviews(reviewerID);
    }
    @GetMapping("reviews/{reviewID}")
    public Review findReviewByID(@PathVariable int reviewID) {
        Optional<Review> optionalReview = reviewRestService.findReviewByID(reviewID);
        if (optionalReview.isPresent()){
            return optionalReview.get();
        }else
            return null;
    }

    @PostMapping("reviews")
    public ResponseEntity<String> addReviews(@RequestBody Review review) {
        Review tempReview = reviewRestService.addReview(review);
        if (tempReview != null)
            return ResponseEntity.ok("Successfully submit the Review");
        else
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to Submit");
    }

    @PutMapping("reviews")
    public ResponseEntity<String> updateReviews(@RequestBody Review review){
        Review tempReview = reviewRestService.updateReview(review);
        if (tempReview != null){
            return ResponseEntity.ok("Successfully update the Review");
        }else
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update the review");
    }
}
