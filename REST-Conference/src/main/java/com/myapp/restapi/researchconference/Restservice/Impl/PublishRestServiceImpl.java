package com.myapp.restapi.researchconference.Restservice.Impl;

import com.myapp.restapi.researchconference.DAO.Interface.PaperDAO;
import com.myapp.restapi.researchconference.DAO.Interface.PublishDAO;
import com.myapp.restapi.researchconference.Restservice.Interface.PublishRestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PublishRestServiceImpl implements PublishRestService {
    private final PaperDAO paperDAO;
    private final PublishDAO publishDAO;

    @Autowired
    public PublishRestServiceImpl(PaperDAO paperDAO, PublishDAO publishDAO) {
        this.paperDAO = paperDAO;
        this.publishDAO = publishDAO;
    }

    @Override
    public boolean acceptPaper(int paperID) {
        return paperDAO.acceptPaper(paperID);
    }

    @Override
    public boolean rejectPaper(int paperID) {
        return paperDAO.rejectPaper(paperID);
    }
}
