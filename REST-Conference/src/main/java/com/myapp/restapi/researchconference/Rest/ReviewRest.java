package com.myapp.restapi.researchconference.Rest;

import com.myapp.restapi.researchconference.DTO.ReviewDTO;
import com.myapp.restapi.researchconference.Exception.IllegalAccessException;
import com.myapp.restapi.researchconference.Exception.NoDataFoundException;
import com.myapp.restapi.researchconference.Restservice.Interface.ReviewRestService;
import com.myapp.restapi.researchconference.entity.Review.Review;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "*")
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
    @GetMapping("reviews/{reviewID}/{reviewerID}")
    public ReviewDTO findReviewByID(@PathVariable int reviewID,@PathVariable int reviewerID ) throws IllegalAccessException {
        ReviewDTO reviewDTO = reviewRestService.findReviewByID(reviewID, reviewerID);
        if (reviewDTO == null)
            return null;
        return reviewDTO;
    }

    @GetMapping ("reviews/{paperID}/by/{authorID}")
    public List<ReviewDTO> findReviewsByPaperID(@PathVariable @Min(1) int paperID, @PathVariable @Min(1) int authorID) throws IllegalAccessException {
        List<ReviewDTO> reviewDTOList = reviewRestService.findReviewsByPaperID(paperID, authorID);
        if (reviewDTOList == null){
            throw new NoDataFoundException("No Reviews Found");
        }
        return reviewDTOList;
    }



    @GetMapping("reviews/ready/{paperID}")
    public List<ReviewDTO> findCompletedReviewsByPaperID(@PathVariable int paperID){
        List<ReviewDTO> reviewDTOList = reviewRestService.findCompletedReviewsByPaperID(paperID);
        return reviewDTOList;
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
