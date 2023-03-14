package com.myapp.restapi.researchconference.DAO;

import com.myapp.restapi.researchconference.entity.Review.Paper.DownloadFileWrapper;
import com.myapp.restapi.researchconference.entity.Review.Paper.Paper;

import java.sql.SQLException;
import java.util.List;

public interface PaperDAO {
    List<Paper> findAll();

    List<Paper> findMyPaper(int userID);

    Paper add(Paper paper);

    DownloadFileWrapper downloadPaper(int paperID) throws SQLException;


}
