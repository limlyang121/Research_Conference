package com.myapp.restapi.researchconference.DTO;

import com.myapp.restapi.researchconference.entity.Paper.File;
import com.myapp.restapi.researchconference.entity.Paper.Paper;
import com.myapp.restapi.researchconference.entity.Paper.PaperInfo;
import com.myapp.restapi.researchconference.entity.Review.Review;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class PaperDTO {
    private int paperID;
    private File file;
    private String status;
    private PaperInfo paperInfo;
    private List<Review> reviewList;

    public PaperDTO() {
        file = new File();
        paperInfo = new PaperInfo();
        reviewList = new ArrayList<>();
    }

    public static List<PaperDTO> convertToDTO(List<Paper> paperList){
        List<PaperDTO> paperDTOList = new ArrayList<>(paperList.size());
        for (Paper paper : paperList){
            PaperDTO  paperDTO = new PaperDTO();
            paperDTO.setPaperID(paper.getPaperID());
            paperDTO.setStatus(paper.getStatus());
            paperDTO.setPaperInfo(paper.getPaperInfo());
            paperDTOList.add(paperDTO);
        }
        return paperDTOList;
    }

    public static PaperDTO convertToDTOSingle(Paper paper){
        PaperDTO paperDTO = new PaperDTO();
        paperDTO.setPaperID(paper.getPaperID());
        paperDTO.setStatus(paper.getStatus());
        paperDTO.setPaperInfo(paper.getPaperInfo());
        paperDTO.setReviewList(paper.getReviewList());
        return paperDTO;
    }

    public static PaperDTO convertToDTOBid(Paper paper){
        PaperDTO paperDTO = new PaperDTO();
        paperDTO.setPaperID(paper.getPaperID());
        paperDTO.setStatus(paper.getStatus());
        paperDTO.setPaperInfo(paper.getPaperInfo());
        return paperDTO;
    }

    public PaperDTO convertToDTODownload(Paper paper){
        PaperDTO paperDTO = new PaperDTO();
        paperDTO.setFile(paper.getFile());
        paperDTO.setPaperInfo(paper.getPaperInfo());
        return paperDTO;
    }

    @Override
    public String toString() {
        return "PaperDTO{" +
                "paperID=" + paperID +
                ", file=" + file +
                ", status='" + status + '\'' +
                ", paperInfo=" + paperInfo +
                ", reviewList=" + reviewList +
                '}';
    }
}
