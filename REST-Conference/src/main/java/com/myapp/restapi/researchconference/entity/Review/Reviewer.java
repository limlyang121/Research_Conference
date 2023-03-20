package com.myapp.restapi.researchconference.entity.Review;


import com.myapp.restapi.researchconference.entity.Paper.Paper;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Reviewer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviewerID")
    private int reviewerID;
    @Column(name = "is_active")
    private int isActive;

    @OneToMany(mappedBy = "reviewer")
    private List<Review> reviewList;
}
