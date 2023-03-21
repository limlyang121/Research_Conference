package com.myapp.restapi.researchconference.rest;

import com.myapp.restapi.researchconference.DTO.ReviewerDTO;
import com.myapp.restapi.researchconference.Restservice.Interface.ReviewerRestService;
import com.myapp.restapi.researchconference.entity.Review.Reviewer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewerRest {
    private final ReviewerRestService reviewerRestService;

    @Autowired
    public ReviewerRest(ReviewerRestService reviewerRestService) {
        this.reviewerRestService = reviewerRestService;
    }

    @GetMapping("reviewer/{userID}")
    public ReviewerDTO findByUserID(@PathVariable int userID) {
        return reviewerRestService.findByUserID(userID);
    }
}
