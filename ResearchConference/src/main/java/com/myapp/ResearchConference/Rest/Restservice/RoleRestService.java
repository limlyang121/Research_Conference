package com.myapp.ResearchConference.Rest.Restservice;

import com.myapp.ResearchConference.Rest.DAO.UserRepo;
import com.myapp.ResearchConference.Rest.entity.Role;
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
