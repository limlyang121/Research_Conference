package com.myapp.restapi.researchconference.Restservice.Impl;

import com.myapp.restapi.researchconference.DAO.Interface.ReviewerDAO;
import com.myapp.restapi.researchconference.DAO.Interface.UserRepo;
import com.myapp.restapi.researchconference.Restservice.Interface.UserRestService;
import com.myapp.restapi.researchconference.entity.Admin.Role;
import com.myapp.restapi.researchconference.entity.Admin.User;
import com.myapp.restapi.researchconference.entity.Review.Reviewer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserRestServiceImpl implements UserRestService {

    private final UserRepo userRepo;
    private final ReviewerDAO reviewerDAO;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserRestServiceImpl(UserRepo userRepo, ReviewerDAO reviewerDAO, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepo = userRepo;
        this.reviewerDAO = reviewerDAO;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    @Transactional
    public List<User> findAll() {
        return userRepo.findAll();
    }

    @Transactional
    @Override
    public List<User> findUserByRole(String roleName) {
        List<User> userList = userRepo.findUserByRole(roleName);
        return userRepo.findUserByRole(roleName);
    }

    @Override
    @Transactional
    public User findByID(int userID) {
        return userRepo.findByID(userID);
    }

    @Override
    @Transactional
    public User findByUserName(String username) {
        return userRepo.findByUserName(username);
    }

    @Override
    @Transactional
    public List<User> searchByUsername(String username) {
        return userRepo.searchByUsername(username);
    }

    @Override
    @Transactional
    public List<User> searchByUsernameAndRole(String username, String roleName) {
        return userRepo.searchByUsernameAndRole(username,roleName);
    }

    @Override
    @Transactional
    public User save(User user) {
        User tempUser = userRepo.findByUserName(user.getUserName());
        if (tempUser != null)
            return null;
        user.setActive(1);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        User user1 =  userRepo.save(user);
        if (user1 != null && user1.getRole().getRole().equalsIgnoreCase("Reviewer")){
            Reviewer reviewer = new Reviewer();
            reviewer.setIsActive(1);
            reviewer.setReviewerID(user1.getId());
            reviewerDAO.addReviewer(reviewer);
        }

        return user1;
    }

    @Override
    @Transactional
    public User update(User user, int userID) {
        boolean isReviewer = false;
        boolean wasReviewer = false;

        User checkIfUserExisted = userRepo.findByUserName(user.getUserName());
        if (checkIfUserExisted != null && checkIfUserExisted.getId() != userID){
            return null;
        }

        Role tempRole = userRepo.findRoleByName(user.getRole().getRole());
        User tempUser = userRepo.findByID(userID);
        if (tempUser.getRole().getRole().equalsIgnoreCase("Reviewer") &&
                (!user.getRole().getRole().equalsIgnoreCase("Reviewer"))) {
            wasReviewer = true;
        }

        if (!tempUser.getRole().getRole().equalsIgnoreCase("Reviewer") &&
                (user.getRole().getRole().equalsIgnoreCase("Reviewer"))) {
            isReviewer = true;
        }

        tempUser.setUserName(user.getUserName());
        tempUser.setRole(tempRole);
        tempUser.setActive(user.getActive());
        tempUser.setUserdetails(user.getUserdetails());
        tempUser.setPassword(user.getPassword());
        boolean success = false;

        if (isReviewer){
            success = reviewerDAO.isActive(tempUser.getId());
        }else if (wasReviewer)
            success = reviewerDAO.isNotActive(tempUser.getId());
        else if (!(isReviewer && wasReviewer)){
            success = true;
        }

        return userRepo.save(tempUser);

    }

    @Override
    @Transactional
    public void deactivation(int userID) {
        userRepo.deactivation(userID);
    }

    @Override
    @Transactional
    public void activation(int userID) {
        userRepo.activation(userID);
    }

    @Override
    @Transactional
    public void delete(int userID) {
        userRepo.delete(userID);
    }
}
