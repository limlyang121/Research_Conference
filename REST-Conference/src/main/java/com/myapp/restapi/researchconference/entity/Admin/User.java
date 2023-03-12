package com.myapp.restapi.researchconference.entity.Admin;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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


}
