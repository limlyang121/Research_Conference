package com.myapp.restapi.researchconference.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.myapp.restapi.researchconference.Restservice.Interface.PapersRestService;
import com.myapp.restapi.researchconference.entity.Review.Paper.File;
import com.myapp.restapi.researchconference.entity.Review.Paper.Paper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:3000")
public class PaperRest {
    private final PapersRestService papersRestService;

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
        List<Paper> a = papersRestService.findMyPaper(myID);
        return papersRestService.findMyPaper(myID);
    }

    @GetMapping("papers/{paperID}")
    public Paper findPaperByID(@PathVariable int paperID){
        Optional<Paper> paper = papersRestService.findPaperByID(paperID);
        if (paper.isPresent()){
            return paper.get();
        }else
            return null;
    }
    @GetMapping("papers/bid")
    public List<Paper> findBidPapers(){
        return papersRestService.findBidPapers();
    }

    @PostMapping(value = "papers", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> add(@RequestParam MultipartFile file, @RequestParam String paperData) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        System.out.println(file.getOriginalFilename());
        System.out.println(file.getResource());
        Paper paper = objectMapper.readValue(paperData, Paper.class);
        paper.getFile().setFileData(file.getBytes());
        paper.getFile().setFileType(file.getContentType());

        Paper tempPaper = papersRestService.add(paper);
        if (tempPaper != null)
            return ResponseEntity.ok("Successfully Added the Paper");
        else
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unknown error have occur");

    }

    @PutMapping("papers/{paperID}")
    public ResponseEntity<String> update(@RequestBody Paper paper, @PathVariable int paperID){
        Paper temp = papersRestService.update(paper, paperID);
        if (temp != null){
            return ResponseEntity.ok("Successfully Update the Paper");
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update");
        }
    }

    @GetMapping ("papers/download/{paperID}")
    public ResponseEntity<byte[]> downloadPaper(@PathVariable int paperID) {
        File temp = papersRestService.downloadPdf(paperID);
        byte[] encodedBytes = java.util.Base64.getEncoder().encode(temp.getFileData());
        if (temp == null){
            return null;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.builder("attachment").filename("Test"+"."+temp.getFileType()).build());
        headers.setContentLength(encodedBytes.length);
        return ResponseEntity.ok().headers(headers).body(temp.getFileData());

    }

    @DeleteMapping("papers/delete/{paperID}")
    public ResponseEntity<String> removePapers(@PathVariable int paperID){
        boolean deleted = papersRestService.deletePaper(paperID);
        if (deleted)
            return ResponseEntity.ok("Successfully Deleted");
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No paper found with the ID");
    }

}
