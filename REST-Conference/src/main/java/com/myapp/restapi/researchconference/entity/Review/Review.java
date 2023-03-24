package com.myapp.restapi.researchconference.entity.Review;


import com.myapp.restapi.researchconference.entity.Bid.Bid;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@Entity
@Table
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviewID")
    private long reviewID;

    @OneToOne
    @JoinColumn(name = "bidID")
    private Bid bid;

    @Column(name = "rate")
    private int rate;
    @Column(name = "comment")
    private String comment;
    @Column(name = "review_date")
    private Date reviewDate;

    public Review() {
        bid = new Bid();
    }

}
