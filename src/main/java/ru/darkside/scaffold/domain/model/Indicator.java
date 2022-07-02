package ru.darkside.scaffold.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Indicator extends AbstractPersistable<Long> {

    @NotEmpty
    @Column
    private String name;

    @NotEmpty
    @Column
    private String code;
}
