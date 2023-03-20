package com.myapp.restapi.researchconference.entity.Paper;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;
import java.util.Arrays;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "file")
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fileID;

    @Lob
    @Column(name = "file_data")
    private byte[] fileData;

    @Column(name = "file_type")
    private String fileType;

    @Override
    public String toString() {
        return "File{" +
                "fileID=" + fileID +
                ", fileData=" + Arrays.toString(fileData) +
                ", fileType='" + fileType + '\'' +
                '}';
    }
}
