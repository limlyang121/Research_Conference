package com.myapp.restapi.researchconference.DAO.Impl;

import com.myapp.restapi.researchconference.DAO.Interface.ReviewerDAO;
import com.myapp.restapi.researchconference.entity.Review.Reviewer;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ReviewerDAOImpl implements ReviewerDAO {
    private EntityManager entityManager;

    @Autowired
    public ReviewerDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Reviewer> findAll() {
        Session session = entityManager.unwrap(Session.class);
        Query<Reviewer> reviewerQuery = session.createQuery("From Reviewer ", Reviewer.class);
        return reviewerQuery.getResultList();
    }

    @Override
    public Optional<Reviewer> findByID(int reviewerID) {
        Session session = entityManager.unwrap(Session.class);
        Query<Reviewer> reviewerQuery = session.createQuery("From Reviewer where reviewerID = :reviewerID", Reviewer.class);
        reviewerQuery.setParameter("reviewerID", reviewerID);
        return reviewerQuery.uniqueResultOptional() ;
    }
}
