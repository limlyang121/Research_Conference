package com.myapp.restapi.researchconference.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.myapp.restapi.researchconference.Restservice.PapersRestService;
import com.myapp.restapi.researchconference.entity.Review.Paper.Paper;
import com.myapp.restapi.researchconference.entity.Review.Paper.PaperFileWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:3000")
public class PaperRest {
    private PapersRestService papersRestService;

    @Autowired
    public PaperRest(PapersRestService papersRestService) {
        this.papersRestService = papersRestService;
    }

    @GetMapping("papers")
    public List<Paper> findAll(){
        return papersRestService.findAll();
    }

    @GetMapping("papers/mypapers/{myID}")
    public List<Paper> findMyPapers(@PathVariable int myID){
        return papersRestService.findMyPaper(myID);
    }

    @PostMapping(value = "papers", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> add(@RequestParam MultipartFile file, @RequestParam String paperData) throws IOException, SQLException {
        ObjectMapper objectMapper = new ObjectMapper();
        System.out.println(file.getOriginalFilename());
        System.out.println(file.getResource());
        Paper paper = objectMapper.readValue(paperData, Paper.class);
        Blob blob = new SerialBlob(file.getBytes());
        paper.setFile(blob);

//        Paper tempPaper = papersRestService.add(paper);
        if (paper != null)
            return ResponseEntity.ok("Successfully Added the Paper");
        else
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unknown error have occur");

    }

}
