package com.myapp.restapi.researchconference.DTO;

import com.myapp.restapi.researchconference.entity.Bid.Bid;
import com.myapp.restapi.researchconference.entity.Paper.Paper;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class BidDTO {
    private int bidID;
    private PaperDTO paperDTO;
    private ReviewerDTO reviewerDTO;
    private String status;

    public BidDTO() {
        paperDTO = new PaperDTO();
        reviewerDTO = new ReviewerDTO();
    }

    public static BidDTO DTOSingle(Bid bid){
        BidDTO bidDTO = new BidDTO();
        bidDTO.setBidID(bid.getBidID());
        bidDTO.setPaperDTO(PaperDTO.convertToDTOBid(bid.getPaper()));
        bidDTO.setReviewerDTO(ReviewerDTO.convertToDTO(bid.getReviewer()));
        bidDTO.setStatus(bid.getStatus());
        return bidDTO;
    }

    public static List<BidDTO> DTOList(List<Bid> bidList  ){
        List<BidDTO> bidDTOList = new ArrayList<>(bidList.size());
        for (Bid bid : bidList){
            BidDTO bidDTO = DTOSingle(bid);
            bidDTOList.add(bidDTO);
        }
        return bidDTOList;
    }

    @Override
    public String toString() {
        return "BidDTO{" +
                "bidID=" + bidID +
                ", paperDTO=" + paperDTO +
                ", reviewerDTO=" + reviewerDTO +
                ", status='" + status + '\'' +
                '}';
    }
}
