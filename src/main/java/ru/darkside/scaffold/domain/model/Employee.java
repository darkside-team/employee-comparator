package ru.darkside.scaffold.domain.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Builder
@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Audited
@NamedEntityGraph(name = "employee",
        attributeNodes = {
                @NamedAttributeNode("indicators"),
                @NamedAttributeNode("department")
        }
)
@EntityListeners(AuditingEntityListener.class)
public class Employee extends AbstractAggregateRoot<Employee, Long> {

    @Override
    protected Employee createNewModel() {
        return new Employee();
    }

    @NotEmpty
    @Column
    private String firstName;

    @NotEmpty
    @Column
    private String lastName;

    @NotEmpty
    @Column
    private String discordLogin;

    @NotEmpty
    @Column
    private String internalLogin;

    @Column
    private Boolean enabled;

    @Column
    private Integer updateCounter;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id")
    private EmployeeIndicator indicators;

    @ManyToOne(fetch = FetchType.EAGER)
    private Department department;

    @ManyToOne(fetch = FetchType.EAGER)
    private EmployeeRole role;

    @ManyToOne(fetch = FetchType.EAGER)
    private EmployeePost post;

    @ManyToOne(fetch = FetchType.EAGER)
    private ModificationSource modificationSource;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Column(name = "created_date", nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime createdDate;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Column(name = "modified_date")
    @LastModifiedDate
    private LocalDateTime modifiedDate;

    @CreatedBy
    @Column(name = "created_by")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String createdBy;

    @LastModifiedBy
    @Column(name = "last_modified_by")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String lastModifiedBy;

    @NotAudited
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private List<EmployeeGratitude> gratitudes;

    @NotAudited
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Nomination> nominations;

    @NotAudited
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private List<EmployeeYearPerformance> performanceByYear;

    @NotAudited
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private List<EmployeeProjectInvolvement> projectInvolvements;

    @NotAudited
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private List<EmployeeWorkingDay> workingDays;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Employee employee = (Employee) o;
        return Objects.equals(firstName, employee.firstName) && Objects.equals(lastName, employee.lastName) && Objects.equals(discordLogin, employee.discordLogin) && Objects.equals(internalLogin, employee.internalLogin) && Objects.equals(department, employee.department) && Objects.equals(role, employee.role) && Objects.equals(modificationSource, employee.modificationSource) && Objects.equals(modifiedDate, employee.modifiedDate) && Objects.equals(lastModifiedBy, employee.lastModifiedBy);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), firstName, lastName, discordLogin, internalLogin, department, role, modificationSource, modifiedDate, lastModifiedBy);
    }
}
