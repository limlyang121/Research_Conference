package com.myapp.restapi.researchconference.Restservice.Impl;

import com.myapp.restapi.researchconference.DAO.Interface.BidDAO;
import com.myapp.restapi.researchconference.DAO.Interface.PaperDAO;
import com.myapp.restapi.researchconference.DAO.Interface.PublishDAO;
import com.myapp.restapi.researchconference.DTO.PaperDTO;
import com.myapp.restapi.researchconference.DTO.PublishDTO;
import com.myapp.restapi.researchconference.Restservice.Interface.PublishRestService;
import com.myapp.restapi.researchconference.entity.Bid.Bid;
import com.myapp.restapi.researchconference.entity.Paper.Paper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PublishRestServiceImpl implements PublishRestService {
    private final PaperDAO paperDAO;
    private final PublishDAO publishDAO;

    private final BidDAO bidDAO;

    @Autowired
    public PublishRestServiceImpl(PaperDAO paperDAO, PublishDAO publishDAO, BidDAO bidDAO) {
        this.paperDAO = paperDAO;
        this.publishDAO = publishDAO;
        this.bidDAO = bidDAO;
    }

    @Override
    @Transactional
    public List<PublishDTO> findReadyToPublishOrRejectPapers() {
        List<Paper> paperList = paperDAO.findReadyPapers();
        List<PublishDTO> publishDTOS = new ArrayList<>(paperList.size());

        for (Paper paper : paperList){
            PublishDTO publishDTO = new PublishDTO();
            List<Bid> bidList = bidDAO.findAllBidForSpecifiedPapers(paper.getPaperID());
            PaperDTO paperDTO = PaperDTO.convertToDTOSingle(paper);
            publishDTO.setPaper(paperDTO);
            publishDTO.setAllReviewed(bidList);
            publishDTOS.add(publishDTO);
        }

        return publishDTOS;

    }

    @Override
    @Transactional
    public boolean readyPaper(int paperID) {
        return paperDAO.readyPaper(paperID);
    }

    @Override
    @Transactional
    public boolean acceptPaper(int paperID) {
        return paperDAO.acceptPaper(paperID);
    }

    @Override
    @Transactional
    public boolean rejectPaper(int paperID) {
        return paperDAO.rejectPaper(paperID);
    }
}
