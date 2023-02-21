package com.myapp.restapi.researchconference.Restservice;

import com.myapp.restapi.researchconference.DAO.UserRepo;
import com.myapp.restapi.researchconference.entity.Role;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleRestService {

    private final UserRepo userRepo;

    public RoleRestService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public List<Role> findAll(){
        return userRepo.findAllRole();
    }


}
