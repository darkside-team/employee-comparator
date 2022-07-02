package ru.darkside.scaffold.domain.model.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;
import ru.darkside.scaffold.domain.model.EmployeeProjectInvolvement;


@Projection(name = "plain", types = { EmployeeProjectInvolvement.class })
public interface EmployeeProjectInvolvementProjection {

    @Value("#{target.project.name}")
    String getName();

    Integer getValue();

    @Value("#{target.project.color}")
    String getColor();

}
