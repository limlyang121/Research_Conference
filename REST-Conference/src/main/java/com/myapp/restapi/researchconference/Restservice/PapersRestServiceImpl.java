package com.myapp.restapi.researchconference.Restservice;

import com.myapp.restapi.researchconference.DAO.PaperDAO;
import com.myapp.restapi.researchconference.entity.Review.Paper.DownloadFileWrapper;
import com.myapp.restapi.researchconference.entity.Review.Paper.File;
import com.myapp.restapi.researchconference.entity.Review.Paper.Paper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PapersRestServiceImpl implements PapersRestService{
    private final PaperDAO paperDAO;

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
    public Optional<Paper> findPaperByID(int paperID)    {
        return paperDAO.findPaperByID(paperID);
    }

    @Override
    @Transactional
    public Paper add(Paper paper) {
        Date currentTime = new Date();
        paper.getPaperInfo().setUpload(currentTime);
        paper.setStatus("Pending");

        return paperDAO.add(paper);
    }
    @Override
    @Transactional
    public Paper update(Paper paper, int paperID){
        Optional<Paper> paperOptional = paperDAO.findPaperByID(paperID);
        if (paperOptional.isPresent()){
            Paper tempPaper = paperOptional.get();
            tempPaper.setPaperInfo(paper.getPaperInfo());
            return paperDAO.updatePaper(tempPaper);
        }else{
            return null;
        }

    }

    @Override
    @Transactional
    public File downloadPdf(int paperID) {
        try{
            return paperDAO.downloadPaper(paperID);
        }catch (SQLException e){
            return null;
        }
    }

    @Override
    @Transactional
    public boolean deletePaper(int paperID) {
        return paperDAO.deletePaper(paperID);
    }
}
