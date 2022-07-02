package ru.darkside.scaffold.domain.model.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;
import ru.darkside.scaffold.domain.model.*;

import java.util.List;

@Projection(name = "full", types = { Employee.class })
public interface EmployeeFullProjection {

    Long getId();

    String getFirstName();

    String getLastName();

    String getDiscordLogin();

    String getInternalLogin();

    @Value("#{target.department.name}")
    String getDepartment();

    @Value("#{target.role.name}")
    String getRole();

    @Value("#{target.post.name}")
    String getPost();

    @Value("#{target.modificationSource.name}")
    String getModificationSource();

    EmployeeIndicator getIndicators();

    List<EmployeeProjectInvolvementProjection> getProjectInvolvements();

    List<EmployeeYearPerformance> getPerformanceByYear();

    List<Nomination> getNominations();

    List<EmployeeGratitudeProjection> getGratitudes();

    List<EmployeeWorkingDay> getWorkingDays();
}
