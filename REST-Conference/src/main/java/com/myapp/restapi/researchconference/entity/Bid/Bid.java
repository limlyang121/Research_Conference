package com.myapp.restapi.researchconference.entity.Bid;


import com.myapp.restapi.researchconference.entity.Paper.Paper;
import com.myapp.restapi.researchconference.entity.Review.Reviewer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Entity
@Table
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bidID;

    @OneToOne
    @JoinColumn(name = "paperID")
    private Paper paper;
    @OneToOne
    @JoinColumn(name = "reviewerID")
    private Reviewer reviewer;
    private String status;

    public Bid() {
        paper = new Paper();
        reviewer = new Reviewer();
    }


}
