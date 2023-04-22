package com.myapp.restapi.researchconference.Rest;

import com.myapp.restapi.researchconference.DTO.ReviewerDTO;
import com.myapp.restapi.researchconference.Restservice.Interface.ReviewerRestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "*")
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
