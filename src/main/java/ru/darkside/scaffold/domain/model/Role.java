package ru.darkside.scaffold.domain.model;

import lombok.*;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Column;
import javax.persistence.Entity;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Role extends AbstractPersistable<Long> {

    @Column
    private String roleName;

}
