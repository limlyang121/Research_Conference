package com.myapp.restapi.researchconference.entity.Review;
import com.myapp.restapi.researchconference.entity.Admin.Userdetails;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Reviewer {
    @Id
    @Column(name = "reviewerID")
    private int reviewerID;
    @Column(name = "is_active")
    private int isActive;

    @OneToOne
    @JoinColumn(name = "user_id")
    private Userdetails userdetails;
}
