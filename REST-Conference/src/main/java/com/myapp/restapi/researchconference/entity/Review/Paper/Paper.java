package com.myapp.restapi.researchconference.entity.Review.Paper;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.myapp.restapi.researchconference.entity.Review.FileData.FileData;
import com.myapp.restapi.researchconference.entity.Review.Reviews.Review;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Table
@Entity
@Data
@Builder
@AllArgsConstructor
public class Paper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paperID")
    private int paperID;

    @OneToOne(fetch = FetchType.EAGER,cascade = {
        CascadeType.REMOVE
    })
    @JsonIgnore
    @JoinColumn(name = "file_info_ID")
    private File file;
    @Column(name = "status")
    private String status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn (name = "paper_info_ID")
    private PaperInfo paperInfo;

    @ManyToMany (cascade = {
            CascadeType.ALL
    }, fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinTable(
            name = "review_paper",
            joinColumns = @JoinColumn(name = "paperID"),
            inverseJoinColumns = @JoinColumn(name = "reviewID")
    )
    private List<Review> reviewList;


    public Paper() {
        file  = new File();
        paperInfo = new PaperInfo();
        reviewList = new ArrayList<>();
    }
}
