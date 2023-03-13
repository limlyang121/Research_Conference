package com.myapp.restapi.researchconference.Restservice;

import com.myapp.restapi.researchconference.DAO.PaperDAO;
import com.myapp.restapi.researchconference.entity.Review.Paper.Paper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Service
public class PapersRestServiceImpl implements PapersRestService{
    private PaperDAO paperDAO;

    @Autowired
    public PapersRestServiceImpl(PaperDAO paperDAO) {
        this.paperDAO = paperDAO;
    }

    @Override
    @Transactional
    public List<Paper> findAll() {
        return paperDAO.findAll();
    }

    @Override
    @Transactional
    public List<Paper> findMyPaper(int userID) {
        return paperDAO.findMyPaper(userID);
    }

    @Override
    @Transactional
    public Paper add(Paper paper) {
        Date currentTime = new Date();
        paper.getPaperInfo().setUpload(currentTime);
        paper.setStatus(false);

        return paperDAO.add(paper);
    }
}
