package com.myapp.restapi.researchconference.DAO;

import com.myapp.restapi.researchconference.entity.Review.Paper.Paper;

import java.util.List;
import java.util.Optional;

public interface PaperDAO {
    List<Paper> findAll();

    List<Paper> findMyPaper(int userID);



}
