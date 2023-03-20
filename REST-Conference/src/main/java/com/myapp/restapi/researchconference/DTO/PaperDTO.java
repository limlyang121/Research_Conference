package com.myapp.restapi.researchconference.DTO;

import com.myapp.restapi.researchconference.entity.Paper.File;
import com.myapp.restapi.researchconference.entity.Paper.PaperInfo;
import com.myapp.restapi.researchconference.entity.Review.Review;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class PaperDTO {
    private int paperID;
    private File file;
    private String status;
    private PaperInfo paperInfo;
    private List<Review> reviewList;

    public PaperDTO() {
        file = new File();
        paperInfo = new PaperInfo();
        reviewList = new ArrayList<>();
    }

    @Override
    public String toString() {
        return "PaperDTO{" +
                "paperID=" + paperID +
                ", file=" + file +
                ", status='" + status + '\'' +
                ", paperInfo=" + paperInfo +
                ", reviewList=" + reviewList +
                '}';
    }
}
