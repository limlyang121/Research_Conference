package com.myapp.restapi.researchconference.DAO.Interface;

import com.myapp.restapi.researchconference.entity.Paper.File;
import com.myapp.restapi.researchconference.entity.Paper.Paper;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface PaperDAO {
    List<Paper> findAll();

    List<Paper> findMyPaper(int userID);

    Optional<Paper> findPaperByID(int userID);

    List<Paper> findBidPapers(int reviewerID);

    List<Paper> findBanPapers(int reviewerID);

    List<Paper> findPapersThatReviewed();

    Paper add(Paper paper);
    void increaseReviewTimes(int paperID);

    Paper downloadPaper(int paperID) throws SQLException;

    boolean deletePaper(int paperID);

    Paper updatePaper(Paper paper);

    boolean acceptPaper(int paperID);
    boolean rejectPaper(int paperID);
}
