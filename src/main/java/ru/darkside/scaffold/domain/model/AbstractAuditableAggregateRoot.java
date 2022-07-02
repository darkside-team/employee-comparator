package ru.darkside.scaffold.domain.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.AuditOverride;
import org.hibernate.envers.Audited;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@Audited
@MappedSuperclass
@AuditOverride(forClass = AbstractAggregateRoot.class)
@EntityListeners(AuditingEntityListener.class)
public abstract class AbstractAuditableAggregateRoot <U extends Serializable, PS, ID extends Serializable>
        extends AbstractAggregateRoot<PS, ID> {

    @CreatedBy
    @Column(name = "created_by")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private U createdBy;

    @LastModifiedBy
    @Column(name = "last_modified_by")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private U lastModifiedBy;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Column(name = "created_date", nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime createdDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Column(name = "modified_date")
    @LastModifiedDate
    private LocalDateTime modifiedDate;
}
