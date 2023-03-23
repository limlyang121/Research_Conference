package com.myapp.restapi.researchconference.rest;

import com.myapp.restapi.researchconference.Restservice.Interface.ReviewRestService;
import com.myapp.restapi.researchconference.entity.Review.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewRest {
    private final ReviewRestService reviewRestService;

    @Autowired
    public ReviewRest(ReviewRestService reviewRestService) {
        this.reviewRestService = reviewRestService;
    }

    @PostMapping("reviews")
    public ResponseEntity<String> addReviews(@RequestBody Review review) {
        Review tempReview = reviewRestService.addReview(review);
        if (tempReview != null)
            return ResponseEntity.ok("Successfully submit the Review");
        else
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to Submit");
    }
}
