package ru.darkside.scaffold.domain.model;


import lombok.*;
import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotEmpty;

@Builder
@Getter
@Setter
@Entity
@Audited
@NoArgsConstructor
@AllArgsConstructor
public class EmployeePost extends AbstractPersistable<Long> {

    @NotEmpty
    @Column
    private String name;
}
