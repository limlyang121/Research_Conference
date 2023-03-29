package com.myapp.restapi.researchconference.DTO;

import com.myapp.restapi.researchconference.entity.Paper.File;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileDTO {
    private int fileID;
    private byte[] fileData;
    private String fileType;

    public static FileDTO DTOSingle(File file){
        FileDTO fileDTO = new FileDTO();
        fileDTO.setFileID(fileDTO.fileID);
        fileDTO.setFileData(file.getFileData());
        fileDTO.setFileType(file.getFileType());
        return fileDTO;
    }

}
