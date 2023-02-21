package com.myapp.ResearchConference.Web.entity;

public class User  {

    private int id;
    private String userName;
    private String password;

    private Role role;
    private int active;

    private Userdetails userdetails;

    public User() {
        userdetails = new Userdetails();
        role = new Role();
    }

    public User(String userName, String password, Role role, int active, Userdetails userdetails) {
        this.userName = userName;
        this.password = password;
        this.role = role;
        this.active = active;
        this.userdetails = userdetails;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public int getActive() {
        return active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public Userdetails getUserdetails() {
        return userdetails;
    }

    public void setUserdetails(Userdetails userdetails) {
        this.userdetails = userdetails;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", active=" + active +
                ", userdetails=" + userdetails +
                '}';
    }
}
