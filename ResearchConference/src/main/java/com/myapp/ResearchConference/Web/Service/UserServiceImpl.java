package com.myapp.ResearchConference.Web.Service;

import com.myapp.ResearchConference.Web.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Collection;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    private final String RestURL;
    private final WebClient webClient;

    @Autowired
    public UserServiceImpl() {
        RestURL = "http://localhost:8080/api/users";
        webClient = WebClient.create(RestURL);
    }

    @Override
    public User save(User user){
        return webClient.post()
                .uri(RestURL)
                .body(Mono.just(user), User.class)
                .retrieve()
                .bodyToMono(User.class)
                .block();
    }

    @Override
    public User update(User user){
        return webClient.put()
                .uri(RestURL)
                .body(Mono.just(user), User.class)
                .retrieve()
                .bodyToMono(User.class)
                .block();
    }

    @Override
    public void delete(int userID) {
        webClient.delete()
                .uri(RestURL + "/" + userID)
                .retrieve()
                .bodyToMono(Void.class)
                .block();
    }

    @Override
    public List<User> findAll() {
        return webClient.get()
                .uri(RestURL)
                .retrieve()
                .bodyToFlux(User.class)
                .collectList()
                .block();
    }

    @Override
    public List<User> findUserByRole(String roleName) {
        return webClient.get()
                .uri(RestURL+"/"+roleName)
                .retrieve()
                .bodyToFlux(User.class)
                .collectList()
                .block();
    }


    @Override
    public User findByUserName(String userName){
        return webClient.get()
                .uri(RestURL + "/username/" + userName)
                .retrieve()
                .bodyToMono(User.class)
                .block();

    }

    @Override
    public User findByID(int userID) {
        return webClient.get()
                .uri(RestURL + "/userID/" + userID)
                .retrieve()
                .bodyToMono(User.class)
                .block();

    }

    @Override
    public List<User> searchByUsername(String username) {
        return webClient.get()
                .uri(RestURL + "/search/" + username)
                .retrieve()
                .bodyToFlux(User.class)
                .collectList()
                .block();
    }

    @Override
    public List<User> searchByUsernameRole(String username, String roleName) {
        return webClient.get()
                .uri(RestURL + "/search/" +roleName + "/"+ username)
                .retrieve()
                .bodyToFlux(User.class)
                .collectList()
                .block();
    }


    @Override
    public ResponseEntity<String> activation(int userID) {
        return webClient.patch()
                .uri(RestURL + "/activation/" + userID)
                .retrieve()
                .toEntity(String.class)
                .block();
    }

    @Override
    public ResponseEntity<String> deactivation(int userID) {
        return webClient.patch()
                .uri(RestURL + "/deactivation/" + userID)
                .retrieve()
                .toEntity(String.class)
                .block();
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByUserName(username);

        if (user == null){
            throw new UsernameNotFoundException("Invalid username or password");
        }

        System.out.println(user.getUserName() +" -    " + user.getPassword());

        System.out.println(user.getRole().getRole());
        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(),
                getAuthorities(user));

    }


    private Collection<? extends GrantedAuthority> getAuthorities(User user) {
        return List.of(new SimpleGrantedAuthority((user.getRole().getRole()).toUpperCase()));
    }
}
