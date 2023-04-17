package com.myapp.restapi.researchconference.Restservice.Interface;

import com.myapp.restapi.researchconference.DTO.ReviewDTO;
import com.myapp.restapi.researchconference.entity.Review.Review;

import java.util.List;
import java.util.Optional;

public interface ReviewRestService {
    List<ReviewDTO> findMyReviews(int reviewerID);
    Optional<Review> findReviewByID(int reviewID);
    List<ReviewDTO> findReviewedPaper();

    List<ReviewDTO> findCompletedReviewsByPaperID(int paperID);


    Review addReview(Review review);
    Review updateReview(Review review);


}
