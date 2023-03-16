package com.myapp.restapi.researchconference.Restservice.Interface;

import com.myapp.restapi.researchconference.entity.Review.Paper.DownloadFileWrapper;
import com.myapp.restapi.researchconference.entity.Review.Paper.File;
import com.myapp.restapi.researchconference.entity.Review.Paper.Paper;

import java.util.List;
import java.util.Optional;

public interface PapersRestService {
    List<Paper> findAll();

    List<Paper> findMyPaper(int userID);

    Optional<Paper> findPaperByID(int userID);
    List<Paper> findBidPapers();


    Paper add(Paper paper);

    Paper update(Paper paper, int paperID);

    File downloadPdf(int paperID);

    boolean deletePaper(int paperID);
}
