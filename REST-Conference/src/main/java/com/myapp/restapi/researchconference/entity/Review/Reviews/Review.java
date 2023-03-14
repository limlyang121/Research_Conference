package com.myapp.restapi.researchconference.entity.Review.Reviews;


import com.myapp.restapi.researchconference.entity.Review.Paper.Paper;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

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

    @Column(name = "reviewerID")
    private int reviewerID;

    @Column(name = "rate")
    private int rate;
    @Column(name = "comment")
    private String comment;
    @Column(name = "reviewDate")
    private Date reviewDate;

    @ManyToMany
    @JoinTable(
            name = "review_paper",
            joinColumns = @JoinColumn(name = "reviewID"),
            inverseJoinColumns = @JoinColumn(name = "paperID")
    )
    private List<Paper> reviewedPaper;

    @Override
    public String toString() {
        return "Review{" +
                "reviewID=" + reviewID +
                ", reviewerID=" + reviewerID +
                ", rate=" + rate +
                ", comment='" + comment + '\'' +
                ", reviewDate=" + reviewDate +
                '}';
    }
}
