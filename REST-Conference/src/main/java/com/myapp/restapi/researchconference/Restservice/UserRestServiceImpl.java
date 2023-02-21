package com.myapp.restapi.researchconference.Restservice;

import com.myapp.restapi.researchconference.DAO.UserRepo;
import com.myapp.restapi.researchconference.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserRestServiceImpl implements UserRestService{

    private final UserRepo userRepo;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserRestServiceImpl(UserRepo userRepo, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepo = userRepo;
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
        boolean success = false;
        if (user.getId() != 0){
            User tempUser = findByID(user.getId());
            if (!bCryptPasswordEncoder.matches(user.getPassword(), tempUser.getPassword()))
                user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        }else{

            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        }

        return userRepo.save(user);
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
