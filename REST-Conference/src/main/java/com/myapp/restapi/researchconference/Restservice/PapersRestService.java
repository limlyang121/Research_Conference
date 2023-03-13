package com.myapp.restapi.researchconference.Restservice;

import com.myapp.restapi.researchconference.entity.Review.Paper.Paper;

import java.util.List;

public interface PapersRestService {
    List<Paper> findAll();

    List<Paper> findMyPaper(int userID);

    Paper add(Paper paper);
}
