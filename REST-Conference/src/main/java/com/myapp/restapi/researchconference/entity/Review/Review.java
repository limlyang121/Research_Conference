package com.myapp.restapi.researchconference.entity.Review;


import com.myapp.restapi.researchconference.entity.Paper.Paper;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviewID")
    private long reviewID;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {
            CascadeType.REFRESH, CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE
    })
    @JoinColumn(name = "reviewerID")
    private Reviewer reviewer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn (name = "paperID")
    private Paper paper;

    @Column(name = "rate")
    private int rate;
    @Column(name = "comment")
    private String comment;
    @Column(name = "review_date")
    private Date reviewDate;

}
