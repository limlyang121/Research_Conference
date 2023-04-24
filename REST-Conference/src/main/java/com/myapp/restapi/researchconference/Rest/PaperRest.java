package com.myapp.restapi.researchconference.Rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.myapp.restapi.researchconference.DTO.PaperDTO;
import com.myapp.restapi.researchconference.DTO.ReviewDTO;
import com.myapp.restapi.researchconference.Restservice.Interface.PapersRestService;
import com.myapp.restapi.researchconference.entity.Paper.Paper;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "*")
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

    @GetMapping("papers/{paperID}/{authorID}")
    public PaperDTO findPaperByID(@PathVariable int paperID, @PathVariable @Min(1) int authorID) throws IllegalAccessException {
        PaperDTO paperDTO = papersRestService.findPaperByID(paperID, authorID);
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

    @GetMapping("papers/pending")
    public List<PaperDTO> findReviewedPapers(){
        return papersRestService.findPapersThatReviewed();
    }

    @GetMapping("papers/ready")
    public List<PaperDTO> findPapersByStatus(){
        return papersRestService.findReadyPapers();
    }

    @GetMapping("papers/readyToPublishOrReject")
    public List<PaperDTO> findPapersThatReadyToPublishOrReject(){
        return papersRestService.findPapersReadyToPublishOrReject();
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
                .filename(temp.getPaperInfo().getFilename().replaceAll(" ", "_"))
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

    @PostMapping(value = "papers/testOnly", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> testAdd(@RequestParam MultipartFile file) throws IOException, GeneralSecurityException {
        System.out.println(file.getOriginalFilename());
        System.out.println(file.getResource());

        Paper tempPaper = papersRestService.addTest(null, file);
        if (tempPaper != null)
            return ResponseEntity.ok("Successfully Added the Paper");
        else
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unknown error have occur");

    }

    @GetMapping(value = "papers/testOnly/Download")
    public ResponseEntity<byte[]> testAddDownload() throws IOException, GeneralSecurityException {
        byte[] test = papersRestService.addTestDownload();

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition
                .builder("attachment")
                .filename("TestOnly")
                .build());
        headers.setContentLength(test.length);

        return ResponseEntity.ok().headers(headers).body(test);
    }

}
