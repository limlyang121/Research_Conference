package com.myapp.restapi.researchconference.entity.Review;
import com.myapp.restapi.researchconference.entity.Admin.Userdetails;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table (name = "reviewer", schema = "public")
public class Reviewer {
    @Id
    @Column(name = "reviewerID")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reviewer_seq")
    @SequenceGenerator(name = "reviewer_seq", sequenceName = "reviewer_id_seq", allocationSize = 1)
    private int reviewerID;
    @Column(name = "is_active")
    private int isActive;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private Userdetails userdetails;
}
