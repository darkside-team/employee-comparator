package ru.darkside.scaffold.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@Entity
@Audited
@NoArgsConstructor
@AllArgsConstructor
public class ModificationSource extends AbstractPersistable<Long> {

    @NotEmpty
    @Column
    private String name;

    @NotEmpty
    @Column
    private String code;
}
