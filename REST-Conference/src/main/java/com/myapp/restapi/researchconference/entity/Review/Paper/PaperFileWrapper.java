package com.myapp.restapi.researchconference.entity.Review.Paper;

import org.springframework.web.multipart.MultipartFile;

public class PaperFileWrapper {
    private MultipartFile file;
    private Paper paper;

    // default constructor
    public PaperFileWrapper() {
    }

    // getters and setters for both fields
    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public Paper getPaper() {
        return paper;
    }

    public void setPaper(Paper paper) {
        this.paper = paper;
    }
}
