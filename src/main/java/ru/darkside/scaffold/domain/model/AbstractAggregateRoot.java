package ru.darkside.scaffold.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.AfterDomainEventPublication;
import org.springframework.data.domain.DomainEvents;
import org.springframework.data.jpa.domain.AbstractPersistable;
import ru.darkside.scaffold.domain.event.DomainEvent;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@MappedSuperclass
public abstract class AbstractAggregateRoot <PS, PK extends Serializable>
        extends AbstractPersistable<PK> {

    @Transient
    @JsonIgnore
    @ToString.Exclude
    private PS previousState;

    @Version
    @Column(name ="version", nullable = false)
    private int version;

    @ToString.Exclude
    @Transient
    @JsonIgnore
    private final List<? extends DomainEvent> domainEvents = new ArrayList<>();

    @DomainEvents
    public Collection<? extends DomainEvent> domainEvents() {
        return domainEvents;
    }

    @AfterDomainEventPublication
    public void clearDomainEvents() {
        domainEvents.clear();
    }

    @PrePersist
    protected void prePersist() {
    }

    @PostLoad
    protected void postLoad() {
        previousState = createNewModel();
        BeanUtils.copyProperties(this, previousState);
    }

    protected abstract PS createNewModel();
}
