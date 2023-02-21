package com.myapp.restapi.researchconference.DAO;

import com.myapp.restapi.researchconference.entity.Role;
import com.myapp.restapi.researchconference.entity.User;

import java.util.List;

public interface UserRepo  {

    User findByUserName(String userName);
    List<User> findAll();

    List<User> findUserByRole(String userName);

    User findByID(int userID);

    List<Role> findAllRole();

    List<User> searchByUsername(String username);

    List<User> searchByUsernameAndRole(String username, String roleName);

    Role findRoleByName(String roleName);

    User save(User user);

    void delete(int userID);

    void deactivation(int userID);

    void activation(int userID);


}
