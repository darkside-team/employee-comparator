package ru.darkside.scaffold.domain.model;

import lombok.*;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Column;
import javax.persistence.Entity;

@Builder
@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeWorkingDay extends AbstractPersistable<Long> {

    @Column
    private Integer training;

    @Column
    private Integer unavailability;

    @Column
    private Integer vacation;

    @Column
    private String name;
}
