package com.myapp.restapi.researchconference.Restservice.Impl;

import com.myapp.restapi.researchconference.DAO.Interface.UserRepo;
import com.myapp.restapi.researchconference.Exception.ExceptionHandling;
import com.myapp.restapi.researchconference.entity.Admin.User;

import com.myapp.restapi.researchconference.entity.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Collection;
import java.util.List;

@Service
public class MyUserDetails implements UserDetailsService {
    private UserRepo userRepo;

    @Autowired
    public MyUserDetails(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException, RuntimeException {
        User user = userRepo.findByUserName(username);
        if (user == null){
            throw new UsernameNotFoundException("Invalid Username or password");
        }else if (user.getActive() == 0){
            throw new RuntimeException("User is disabled");
        }
        return new CustomUserDetails(user.getId(), user.getUserName(), user.getPassword(), getAuthorities(user));

    }

    private Collection<? extends GrantedAuthority> getAuthorities(User user) {
        return List.of(new SimpleGrantedAuthority((user.getRole().getRole()).toUpperCase()));
    }
}
