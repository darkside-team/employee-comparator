package ru.darkside.scaffold.domain.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Column;
import javax.persistence.Entity;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeYearPerformance extends AbstractPersistable<Long> {

    @Column
    private Integer pv;

    @Column
    private String name;
    
}
