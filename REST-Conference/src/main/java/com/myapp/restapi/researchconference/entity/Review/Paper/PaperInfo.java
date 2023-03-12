package com.myapp.restapi.researchconference.entity.Review.Paper;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaperInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paperID")
    private int id;
    private String title;
    private String filename;
    private Date upload;
    @Column(name = "authorID")
    private int authorID;
    private String description;


}
