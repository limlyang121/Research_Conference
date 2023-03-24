package com.myapp.restapi.researchconference.entity.Paper;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

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

    @OneToOne(fetch = FetchType.LAZY,cascade = {
        CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.PERSIST, CascadeType.MERGE
    })
    @JsonIgnore
    @JoinColumn(name = "file_info_ID")
    private File file;
    @Column(name = "status")
    private String status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn (name = "paper_info_ID")
    private PaperInfo paperInfo;

    public Paper() {
        file  = new File();
        paperInfo = new PaperInfo();
    }
}
