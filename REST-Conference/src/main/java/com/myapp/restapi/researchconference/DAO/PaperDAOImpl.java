package com.myapp.restapi.researchconference.DAO;

import com.myapp.restapi.researchconference.entity.Review.Paper.Paper;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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

        Query<Paper> paperQuery = session.createQuery("From Paper");
        return paperQuery.getResultList();
    }

    @Override
    public List<Paper> findMyPaper(int userID) {
        Session session = entityManager.unwrap(Session.class);

        Query<Paper> paperQuery = session.createQuery("From Paper inner join PaperInfo on " +
                "Paper .id = PaperInfo .id where PaperInfo .authorID = :userID");

        paperQuery.setParameter("userID", userID);

        return paperQuery.getResultList();
    }
}
