package com.myapp.restapi.researchconference.entity.Review.FileData;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "file_data")
@Entity
public class FileData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fileID;

    @Lob
    @Column(name = "file_data")
    private Blob fileData;

    @Column(name = "data_type")
    private String dataType;

}
