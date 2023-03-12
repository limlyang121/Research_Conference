package com.myapp.restapi.researchconference.entity.Review.Paper;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.myapp.restapi.researchconference.entity.Review.Reviews.Review;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;
import java.util.List;

@Table
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Paper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paperID")
    private int paperID;

    @Lob
    @Column(name = "file")
    private Blob file;
    @Column(name = "status", columnDefinition = "TINYINT(1)")
    private Boolean status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn (name = "paper_info_ID")
    @JsonManagedReference
    private PaperInfo paperInfo;

    @ManyToMany
    @JoinTable(
            name = "review_paper",
            joinColumns = @JoinColumn(name = "paperID"),
            inverseJoinColumns = @JoinColumn(name = "reviewID")
    )
    private List<Review> reviewList;

}
