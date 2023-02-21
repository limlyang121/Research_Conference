package com.myapp.ResearchConference.Web.Service;

import com.myapp.ResearchConference.Web.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> findAll();

    List<User> findUserByRole(String roleName);

    User findByUserName(String username);

    User findByID(int userID);

    List<User> searchByUsername(String username);

    List<User> searchByUsernameRole(String username, String roleName);

    User save(User user);

    void delete(int userID);

    User update(User user);

    ResponseEntity<String> activation(int userID);
    ResponseEntity<String> deactivation(int userID);

}
