package ru.darkside.scaffold.domain.model;

import lombok.*;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

@Builder
@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeProjectInvolvement extends AbstractPersistable<Long> {

    @ManyToOne(fetch = FetchType.EAGER)
    private Project project;

    @Column
    private Integer value;


}
