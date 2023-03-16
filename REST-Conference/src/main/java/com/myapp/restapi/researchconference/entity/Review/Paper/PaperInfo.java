package com.myapp.restapi.researchconference.entity.Review.Paper;

import com.myapp.restapi.researchconference.entity.Admin.Userdetails;
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
    private int paperID;
    private String title;
    private String filename;
    private Date upload;

    @OneToOne(fetch = FetchType.EAGER,
    cascade = {
            CascadeType.PERSIST,CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH}
    )
    @JoinColumn(name = "authorID")
    private Userdetails authorID;
    private String description;

    @Override
    public String toString() {
        return "PaperInfo{" +
                "title='" + title + '\'' +
                ", filename='" + filename + '\'' +
                ", upload=" + upload +
                ", authorID=" + authorID +
                ", description='" + description + '\'' +
                '}';
    }
}
