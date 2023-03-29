package com.myapp.restapi.researchconference.Restservice.Impl;

import com.myapp.restapi.researchconference.DAO.Interface.PaperDAO;
import com.myapp.restapi.researchconference.DAO.Interface.ReviewDAO;
import com.myapp.restapi.researchconference.DAO.Interface.UserRepo;
import com.myapp.restapi.researchconference.DTO.PaperDTO;
import com.myapp.restapi.researchconference.DTO.ReviewDTO;
import com.myapp.restapi.researchconference.Restservice.Interface.PapersRestService;
import com.myapp.restapi.researchconference.entity.Admin.Userdetails;
import com.myapp.restapi.researchconference.entity.Paper.File;
import com.myapp.restapi.researchconference.entity.Paper.Paper;
import com.myapp.restapi.researchconference.entity.Review.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static com.myapp.restapi.researchconference.DTO.PaperDTO.convertToDTO;

@Service
public class PapersRestServiceImpl implements PapersRestService {
    private final PaperDAO paperDAO;
    private final UserRepo userRepo;
    private final ReviewDAO reviewDAO;

    @Autowired
    public PapersRestServiceImpl(PaperDAO paperDAO, UserRepo userRepo, ReviewDAO reviewDAO) {
        this.paperDAO = paperDAO;
        this.userRepo = userRepo;
        this.reviewDAO = reviewDAO;
    }

    @Override
    @Transactional
    public List<PaperDTO> findAll() {
        List<PaperDTO> paperDTO = PaperDTO.convertToDTO(paperDAO.findAll());
        return paperDTO;
    }

    @Override
    @Transactional
    public List<PaperDTO> findMyPaper(int userID) {
        List<Paper> paper = paperDAO.findMyPaper(userID);
        return PaperDTO.convertToDTO(paper);

    }

    @Override
    @Transactional
    public PaperDTO findPaperByID(int paperID)    {
        Optional<Paper>  paper = paperDAO.findPaperByID(paperID);
        if (paper.isPresent()){
            return PaperDTO.convertToDTOSingle(paper.get());
        }else
            return null;
    }

    @Override
    @Transactional
    public List<ReviewDTO> findPapersReviews(int paperID) {
        List<Review> reviewList = reviewDAO.findReviewsByPaperID(paperID);
        return ReviewDTO.DTOList(reviewList);
    }

    @Override
    @Transactional
    public List<PaperDTO> findBidPapers(int reviewerID) {
        List<Paper> paperList = paperDAO.findBidPapers(reviewerID);
        return PaperDTO.convertToDTO(paperList);
    }

    @Override
    @Transactional
    public List<PaperDTO> findBanPapers(int reviewerID) {
        List<Paper> paperList = paperDAO.findBanPapers(reviewerID);
        return PaperDTO.convertToDTO(paperList);
    }

    @Override
    public List<PaperDTO> findPapersThatReviewed() {
        List<Paper> paperList = paperDAO.findPapersThatReviewed();
        return PaperDTO.convertToDTO(paperList);
    }

    @Override
    @Transactional
    public Paper add(Paper paper) {
        Date currentTime = new Date();
        paper.getPaperInfo().setUpload(currentTime);
        paper.setStatus("Pending");
        Userdetails userdetails= userRepo.findByID(paper.getPaperInfo().getAuthorID().getId()).getUserdetails();
        paper.getPaperInfo().setAuthorID(userdetails);

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
    public PaperDTO downloadPdf(int paperID) {
        Optional<Paper> paper = paperDAO.findPaperByID(paperID);
        if (paper.isPresent()){
            return PaperDTO.convertToDTODownload(paper.get());
        }
        else
            return  null;
    }

    @Override
    @Transactional
    public boolean deletePaper(int paperID) {
        return paperDAO.deletePaper(paperID);
    }
}
