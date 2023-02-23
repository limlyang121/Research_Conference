package com.myapp.restapi.researchconference.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table
public class User  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "username")
    private String userName;
    @Column(name = "password")
    private String password;

    @ManyToOne (cascade =
            {CascadeType.DETACH,CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.REFRESH})
    @JoinColumn(name = "roles")
    private Role role;
    @Column(name = "active")
    private int active;

    @OneToOne(cascade = {
            CascadeType.ALL
    })
    @JoinColumn (name = "user_id")
    @JsonManagedReference
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
