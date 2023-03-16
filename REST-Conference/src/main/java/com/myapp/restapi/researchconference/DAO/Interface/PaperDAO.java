package com.myapp.restapi.researchconference.DAO.Interface;

import com.myapp.restapi.researchconference.entity.Review.Paper.DownloadFileWrapper;
import com.myapp.restapi.researchconference.entity.Review.Paper.File;
import com.myapp.restapi.researchconference.entity.Review.Paper.Paper;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface PaperDAO {
    List<Paper> findAll();

    List<Paper> findMyPaper(int userID);

    Optional<Paper> findPaperByID(int userID);

    Paper add(Paper paper);

    File downloadPaper(int paperID) throws SQLException;

    boolean deletePaper(int paperID);

    Paper updatePaper(Paper paper);

    List<Paper> findBidPapers();

}
