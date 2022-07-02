package ru.darkside.scaffold.domain.model;

import lombok.*;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotEmpty;

@Builder
@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Project extends AbstractPersistable<Long> {

    @NotEmpty
    @Column
    private String name;

    @NotEmpty
    @Column
    private String color;
}
