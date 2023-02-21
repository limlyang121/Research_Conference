package com.myapp.ResearchConference.Web.entity;


public class Role {
    private String role;
    private String desc;

    public Role() {
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    @Override
    public String toString() {
        return "Role{" +
                "role='" + role + '\'' +
                ", desc='" + desc + '\'' +
                '}';
    }
}
