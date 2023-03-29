package com.myapp.restapi.researchconference.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.myapp.restapi.researchconference.DTO.PaperDTO;
import com.myapp.restapi.researchconference.DTO.ReviewDTO;
import com.myapp.restapi.researchconference.Exception.ExceptionHandling;
import com.myapp.restapi.researchconference.Restservice.Interface.PapersRestService;
import com.myapp.restapi.researchconference.entity.Paper.File;
import com.myapp.restapi.researchconference.entity.Paper.Paper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

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
    public List<PaperDTO> findAll(){
        return papersRestService.findAll();
    }

    @GetMapping("papers/mypapers/{myID}")
    public List<PaperDTO> findMyPapers(@PathVariable int myID){
        List<PaperDTO> a = papersRestService.findMyPaper(myID);
        return papersRestService.findMyPaper(myID);
    }

    @GetMapping("papers/{paperID}/review")
    public List<ReviewDTO> findReviewsByPaperID(@PathVariable int paperID) {
        return papersRestService.findPapersReviews(paperID) ;
    }

    @GetMapping("papers/{paperID}")
    public PaperDTO findPaperByID(@PathVariable int paperID){
        PaperDTO paperDTO = papersRestService.findPaperByID(paperID);
        return  paperDTO;
    }
    @GetMapping("papers/bid/{reviewerID}")
    public List<PaperDTO> findBidPapers(@PathVariable int reviewerID){
        return papersRestService.findBidPapers(reviewerID);
    }

    @GetMapping("papers/ban/{reviewerID}")
    public List<PaperDTO> findBanPapers(@PathVariable int reviewerID){
        return papersRestService.findBanPapers(reviewerID);
    }

    @GetMapping("papers/ready")
    public List<PaperDTO> findReviewedPapers(){
        return papersRestService.findPapersThatReviewed();
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
        PaperDTO temp = papersRestService.downloadPdf(paperID);
        if (temp == null){
            throw new RuntimeException("Paper not found");
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition
                .builder("attachment")
                .filename(temp.getPaperInfo().getFilename()+".pdf")
                .build());
        headers.setContentLength(temp.getFile().getFileData().length);

        return ResponseEntity.ok().headers(headers).body(temp.getFile().getFileData());
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
