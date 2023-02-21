package com.myapp.ResearchConference.Web.controller;

import com.myapp.ResearchConference.Web.Service.RoleService;
import com.myapp.ResearchConference.Web.Service.UserService;
import com.myapp.ResearchConference.Web.entity.Role;
import com.myapp.ResearchConference.Web.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;

import java.util.List;

@Controller
@RequestMapping("admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;


    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("list")
    public String findAll(@RequestParam(required = false, defaultValue = "ALL", value = "roleName")  String roleName, Model model){

        List<Role> roleList = roleService.findAll();

        List<User> userList = null;
        if (roleName.equalsIgnoreCase("ALL"))
            userList = userService.findAll();
        else
            userList = userService.findUserByRole(roleName);

        model.addAttribute("userList", userList);
        model.addAttribute("rolesList", roleList);

        return "admin/ViewAllUser";
    }

    @GetMapping("search")
    public String searchUser(@RequestParam("username") String userName,
                             @RequestParam("searchRole") String roleName,
                             Model model){
        List<Role> roleList = roleService.findAll();
        List<User> userList = null;
        if (roleName.equalsIgnoreCase("all"))
            userList = userService.searchByUsername(userName);
        else
            userList = userService.searchByUsernameRole(userName, roleName);

        model.addAttribute("rolesList", roleList);
        model.addAttribute("userList", userList);

        return "admin/ViewAllUser";


    }

    @GetMapping("read")
    public String readUser(@RequestParam("userID") int userID, Model model){
        User user = userService.findByID(userID);
        StringUtils.capitalize(user.getRole().getRole());
        model.addAttribute("user", user);

        return "admin/ReadUser";
    }

    @GetMapping("add")
    public String showFormAdd(Model model){
        List<Role> roleList = roleService.findAll();
        model.addAttribute("user", new User());
        model.addAttribute("rolesList", roleList);
        return "admin/UserForm";
    }

    @GetMapping("update")
    public String showFormUpdate(@RequestParam("userID") int userID
    ,Model model){
        List<Role> roleList = roleService.findAll();
        User user = userService.findByID(userID);
        model.addAttribute("user", user);
        model.addAttribute("rolesList", roleList);

        return "admin/UserForm";
    }

//    No Validation yet, lazy to set up
    @PostMapping("processForm")
    public String processForm(@ModelAttribute("user") User user,
                              Model model){

        System.out.println(user);

        if (user.getId() == 0)
            userService.save(user);
        else
            userService.update(user);

        return "redirect:/admin/list";

    }

    @PostMapping("delete")
    public String delete(@RequestParam("userID") int userID, Model model){
        userService.delete(userID);
        return "redirect:/admin/list";
    }

    @PostMapping("deactivation")
    public String deactivate(@RequestParam("userID") int userID){
        ResponseEntity<String> http = userService.deactivation(userID);
        http.getStatusCode();

        return "redirect:/admin/read?userID="+userID;
    }

    @PostMapping("activation")
    public String activation(@RequestParam("userID") int userID){
        ResponseEntity<String> http = userService.activation(userID);
        http.getStatusCode();

        return "redirect:/admin/read?userID="+userID;
    }
}
