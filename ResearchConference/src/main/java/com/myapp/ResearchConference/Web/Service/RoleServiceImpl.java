package com.myapp.ResearchConference.Web.Service;

import com.myapp.ResearchConference.Web.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    private final String RestURL;
    private final WebClient webClient;

    @Autowired
    public RoleServiceImpl() {
        RestURL = "http://localhost:8080/api/roles";
        webClient = WebClient.create(RestURL);
    }

    @Override
    public List<Role> findAll() {
        return webClient.get()
                .uri(RestURL)
                .retrieve()
                .bodyToFlux(Role.class)
                .collectList()
                .block();
    }

}
