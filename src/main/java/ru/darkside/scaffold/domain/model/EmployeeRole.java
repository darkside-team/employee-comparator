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
@NoArgsConstructor
@AllArgsConstructor
@Audited
public class EmployeeRole extends AbstractPersistable<Long> {

    @NotEmpty
    @Column
    private String name;
}
