package com.myapp.restapi.researchconference.DAO.Impl;

import com.myapp.restapi.researchconference.DAO.Interface.BidDAO;
import com.myapp.restapi.researchconference.entity.Bid.Bid;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BidDAOImpl implements BidDAO {
    private final EntityManager entityManager;

    @Autowired
    public BidDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Bid> findAll() {
        Session session = entityManager.unwrap(Session.class);

        Query<Bid> query = session.createQuery("From Bid where status = 'Pending'", Bid.class );

        return query.getResultList();
    }

    @Override
    public List<Bid> findMyBidByStatus(int reviewerID, String status) {
        Session session = entityManager.unwrap(Session.class);

        Query<Bid> query = session.createQuery("From Bid where reviewer.reviewerID = :reviewerID " +
                "and status = :status");

        query.setParameter("reviewerID", reviewerID);
        query.setParameter("status", status);

        return query.getResultList();
    }

    @Override
    public boolean hideBid(int bidID) {
        return false;
    }

    @Override
    public Bid addBid (Bid bid) {
        Session session = entityManager.unwrap(Session.class);
        try{
            session.merge(bid);
            return bid;
        }catch(Exception e){
            return null;
        }
    }

    @Override
    public boolean deleteBid(int bidID) {
        Session session = entityManager.unwrap(Session.class);
        try{
            Bid bid = session.get(Bid.class, bidID);
            session.remove(bid);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
