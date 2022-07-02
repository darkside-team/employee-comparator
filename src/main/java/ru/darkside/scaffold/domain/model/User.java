package ru.darkside.scaffold.domain.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(uniqueConstraints={
   @UniqueConstraint(columnNames={"username"})
})
public class User extends AbstractAggregateRoot<User, Long> {

    @NotEmpty
    @Column
    private String username;

    @NotEmpty
    @JsonIgnore
    @Column
    private String password;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private boolean enabled;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<Role> roles = new ArrayList<>();

    @Override
    protected User createNewModel() {
        return new User();
    }
}
