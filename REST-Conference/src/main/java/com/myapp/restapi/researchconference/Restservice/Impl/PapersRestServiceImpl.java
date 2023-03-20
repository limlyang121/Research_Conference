package com.myapp.restapi.researchconference.Restservice.Impl;

import com.myapp.restapi.researchconference.DAO.Interface.PaperDAO;
import com.myapp.restapi.researchconference.DAO.Interface.UserRepo;
import com.myapp.restapi.researchconference.DTO.PaperDTO;
import com.myapp.restapi.researchconference.Restservice.Interface.PapersRestService;
import com.myapp.restapi.researchconference.entity.Admin.Userdetails;
import com.myapp.restapi.researchconference.entity.Paper.File;
import com.myapp.restapi.researchconference.entity.Paper.Paper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PapersRestServiceImpl implements PapersRestService {
    private final PaperDAO paperDAO;
    private final UserRepo userRepo;

    @Autowired
    public PapersRestServiceImpl(PaperDAO paperDAO, UserRepo userRepo) {
        this.paperDAO = paperDAO;
        this.userRepo = userRepo;
    }

    @Override
    @Transactional
    public List<PaperDTO> findAll() {
        List<PaperDTO> paperDTO = convertToDTO(paperDAO.findAll());
        return paperDTO;
    }

    @Override
    @Transactional
    public List<PaperDTO> findMyPaper(int userID) {
        List<Paper> paper = paperDAO.findMyPaper(userID);
        return convertToDTO(paper);

    }
    public List<PaperDTO> convertToDTO(List<Paper> paperList){
        List<PaperDTO> paperDTOList = new ArrayList<>(paperList.size());
        for (Paper paper : paperList){
            PaperDTO  paperDTO = new PaperDTO();
            paperDTO.setPaperID(paper.getPaperID());
            paperDTO.setStatus(paper.getStatus());
            paperDTO.setPaperInfo(paper.getPaperInfo());
            paperDTOList.add(paperDTO);
        }
        return paperDTOList;
    }

    public PaperDTO convertToDTOSingle(Paper paper){
        PaperDTO paperDTO = new PaperDTO();
        paperDTO.setPaperID(paper.getPaperID());
        paperDTO.setStatus(paper.getStatus());
        paperDTO.setPaperInfo(paper.getPaperInfo());
        return paperDTO;
    }

    public PaperDTO convertToDTODownload(Paper paper){
        PaperDTO paperDTO = new PaperDTO();
        paperDTO.setFile(paper.getFile());
        paperDTO.setPaperInfo(paper.getPaperInfo());
        return paperDTO;
    }

    @Override
    @Transactional
    public PaperDTO findPaperByID(int paperID)    {
        Optional<Paper>  paper = paperDAO.findPaperByID(paperID);
        if (paper.isPresent()){
            return convertToDTOSingle(paper.get());
        }else
            return null;
    }

    @Override
    @Transactional
    public List<PaperDTO> findBidPapers(int reviewerID) {
        List<Paper> paperList = paperDAO.findBidPapers(reviewerID);
        return convertToDTO(paperList);
    }

    @Override
    @Transactional
    public List<PaperDTO> findBanPapers(int reviewerID) {
        List<Paper> paperList = paperDAO.findBanPapers(reviewerID);
        return convertToDTO(paperList);
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
