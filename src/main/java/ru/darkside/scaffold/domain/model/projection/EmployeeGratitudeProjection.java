package ru.darkside.scaffold.domain.model.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;
import ru.darkside.scaffold.domain.model.EmployeeGratitude;

import java.time.LocalDate;

@Projection(name = "plain", types = { EmployeeGratitude.class })
public interface EmployeeGratitudeProjection {

    @Value("#{target.gratitude.name}")
    String getName();

    LocalDate getReceiptDate();
}
