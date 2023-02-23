package com.myapp.restapi.researchconference.Restservice;

import com.myapp.restapi.researchconference.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserRestService extends UserDetailsService {
    List<User> findAll();
    List<User> findUserByRole(String roleName);

    List<User> searchByUsername(String username);

    List<User> searchByUsernameAndRole(String username, String roleName);

    User findByID(int userID);

    User findByUserName(String username);

    User save(User user);

    User update(User user, int userID);

    void delete(int userID);

    void deactivation(int userID);

    void activation(int userID);

}
