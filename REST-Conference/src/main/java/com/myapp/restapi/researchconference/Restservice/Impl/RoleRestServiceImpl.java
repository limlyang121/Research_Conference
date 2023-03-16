package com.myapp.restapi.researchconference.Restservice.Impl;

import com.myapp.restapi.researchconference.DAO.Interface.RoleDAO;
import com.myapp.restapi.researchconference.DAO.Interface.UserRepo;
import com.myapp.restapi.researchconference.Restservice.Interface.RoleRestService;
import com.myapp.restapi.researchconference.entity.Admin.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RoleRestServiceImpl implements RoleRestService {

    private final UserRepo userRepo;
    private final RoleDAO roleDAO;

    @Autowired
    public RoleRestServiceImpl(UserRepo userRepo, RoleDAO roleDAO) {
        this.userRepo = userRepo;
        this.roleDAO = roleDAO;
    }

    @Transactional
    public List<Role> findAll(){
        return userRepo.findAllRole();
    }

    @Transactional
    @Override
    public Optional<Role> findRoleByName(String role) {
        return roleDAO.findRoleByName(role);
    }

    @Transactional
    @Override
    public Role add(Role role) {
        return roleDAO.add(role);
    }

    @Override
    @Transactional
    public Role update(Role role) {
        return null;
    }

    @Override
    @Transactional
    public boolean delete(String roleName) {
        return roleDAO.delete(roleName);
    }
}
