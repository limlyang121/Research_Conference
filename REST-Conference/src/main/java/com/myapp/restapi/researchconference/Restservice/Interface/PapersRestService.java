package com.myapp.restapi.researchconference.Restservice.Interface;

import com.myapp.restapi.researchconference.DTO.PaperDTO;
import com.myapp.restapi.researchconference.DTO.ReviewDTO;
import com.myapp.restapi.researchconference.entity.Paper.File;
import com.myapp.restapi.researchconference.entity.Paper.Paper;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

public interface PapersRestService {
    List<PaperDTO> findAll();

    List<PaperDTO> findMyPaper(int userID);

    PaperDTO findPaperByID(int userID, int authorID) throws IllegalAccessException;

    List<ReviewDTO> findPapersReviews(int paperID);

    List<PaperDTO> findBidPapers(int reviewerID);
    List<PaperDTO> findBanPapers(int reviewerID);
    List<PaperDTO> findPapersThatReviewed();

    List<PaperDTO> findReadyPapers();

    List<PaperDTO> findPapersReadyToPublishOrReject();


    Paper add(Paper paper);

    Paper addTest(Paper paper, MultipartFile file) throws IOException, GeneralSecurityException;
    byte[] addTestDownload() throws GeneralSecurityException, IOException;
    Paper update(Paper paper, int paperID);
    PaperDTO downloadPdf(int paperID);
    boolean deletePaper(int paperID);
}
