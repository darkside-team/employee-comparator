package ru.darkside.scaffold.domain.model.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;
import ru.darkside.scaffold.domain.model.Employee;

@Projection(name = "plain", types = { Employee.class })
public interface EmployeeProjection {

    Long getId();

    String getFirstName();

    String getLastName();

    @Value("#{target.department.name}")
    String getDepartment();

    @Value("#{target.role.name}")
    String getRole();

    @Value("#{target.post.name}")
    String getPost();

    @Value("#{target.modificationSource.name}")
    String getModificationSource();

    String getDiscordLogin();

    String getInternalLogin();
}
