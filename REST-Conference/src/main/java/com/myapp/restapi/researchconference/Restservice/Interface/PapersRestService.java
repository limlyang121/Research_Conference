package com.myapp.restapi.researchconference.Restservice.Interface;

import com.myapp.restapi.researchconference.DTO.PaperDTO;
import com.myapp.restapi.researchconference.DTO.ReviewDTO;
import com.myapp.restapi.researchconference.entity.Paper.File;
import com.myapp.restapi.researchconference.entity.Paper.Paper;

import java.util.List;

public interface PapersRestService {
    List<PaperDTO> findAll();

    List<PaperDTO> findMyPaper(int userID);

    PaperDTO findPaperByID(int userID);

    List<ReviewDTO> findPapersReviews(int paperID);

    List<PaperDTO> findBidPapers(int reviewerID);
    List<PaperDTO> findBanPapers(int reviewerID);
    List<PaperDTO> findPapersThatReviewed();



    Paper add(Paper paper);
    Paper update(Paper paper, int paperID);
    PaperDTO downloadPdf(int paperID);
    boolean deletePaper(int paperID);
}
