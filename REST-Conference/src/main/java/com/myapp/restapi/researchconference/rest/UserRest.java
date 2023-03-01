package com.myapp.restapi.researchconference.rest;

import com.myapp.restapi.researchconference.Restservice.UserRestService;
import com.myapp.restapi.researchconference.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api")
public class UserRest {

    private final UserRestService userRestService;

    @Autowired
    public UserRest(UserRestService userRestService) {
        this.userRestService = userRestService;
    }

    @GetMapping("users")
    public List<User> findAll(){
        List<User> userList = userRestService.findAll();

        return userRestService.findAll();
    }

    @GetMapping("users/{roleName}")
    public List<User> findAllByRole(@PathVariable String roleName){
        return userRestService.findUserByRole(roleName);
    }

    @GetMapping("users/userID/{userID}")
    public User findByID(@PathVariable int userID){
        return userRestService.findByID(userID);
    }

    @GetMapping("users/username/{username}")
    public User findByUserName(@PathVariable String username){
        return userRestService.findByUserName(username);
    }

    @GetMapping("users/search/{username}")
    public List<User> searchByUsername(@PathVariable String username){
        return userRestService.searchByUsername(username);
    }

    @GetMapping("users/search/{role}/{username}")
    public List<User> searchByUsernameAndRole(@PathVariable("role") String roleName,
                                              @PathVariable("username") String username){
        return userRestService.searchByUsernameAndRole(username, roleName);
    }

    @DeleteMapping("users/{userID}")
    public void delete(@PathVariable int userID){
        userRestService.delete(userID);
    }

    @PostMapping("users")
    public ResponseEntity<String > add(@RequestBody User user){
        userRestService.save(user);
        return ResponseEntity.ok("Successfully Add");
    }

    @PutMapping("users/{userID}")
    public User update(@RequestBody User user,@PathVariable int userID){
        return userRestService.update(user, userID);
    }

    @PatchMapping("users/activation/{userID}")
    public ResponseEntity<String> activation(@PathVariable int userID){
        userRestService.activation(userID);

        return ResponseEntity.ok("Successfully Activate the Account");
    }

    @PatchMapping("users/deactivation/{userID}")
    public ResponseEntity<String> deactivation(@PathVariable int userID){
        userRestService.deactivation(userID);

        return ResponseEntity.ok("Successfully Deactivate the Account");
    }

}
