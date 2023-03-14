package com.myapp.restapi.researchconference.DAO;

import com.myapp.restapi.researchconference.entity.Review.Paper.DownloadFileWrapper;
import com.myapp.restapi.researchconference.entity.Review.Paper.Paper;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

@Repository
public class PaperDAOImpl implements PaperDAO{
    private final EntityManager entityManager;

    @Autowired
    public PaperDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Paper> findAll() {
        Session session = entityManager.unwrap(Session.class);

        Query<Paper> paperQuery = session.createQuery("From Paper", Paper.class);
        return paperQuery.getResultList();
    }

    @Override
    public List<Paper> findMyPaper(int userID) {
        Session session = entityManager.unwrap(Session.class);
        try{
            Query<Paper> paperQuery = session.createQuery("From Paper p inner join PaperInfo pi on p.paperID = pi.paperID" +
                    " where pi .authorID = :userID", Paper.class);
            paperQuery.setParameter("userID", userID);
            List<Paper> a = paperQuery.getResultList();

            return paperQuery.getResultList();
        }catch (Exception e){
            System.out.println(e);
            return null;
        }

    }

    @Override
    public Paper add(Paper paper) {
        Session session = entityManager.unwrap(Session.class);

        try{
            if (paper.getPaperID() == 0){
                session.persist(paper);
            }else{
                session.merge(paper);

            }

            return paper;
        }catch (Exception e){
            System.err.println(e);
            return null;
        }
    }

    @Override
    public DownloadFileWrapper downloadPaper(int paperID) {
        Session session = entityManager.unwrap(Session.class);
        Paper paper = session.get(Paper.class, paperID);
        byte[] pdfBytes = paper.getFile().getFileData();
        return new DownloadFileWrapper(pdfBytes, paper.getFile().getFileType(), paper.getPaperInfo().getFilename());
    }
}
