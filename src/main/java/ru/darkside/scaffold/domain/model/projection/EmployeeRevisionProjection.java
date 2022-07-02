package ru.darkside.scaffold.domain.model.projection;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;
import ru.darkside.scaffold.domain.model.Employee;
import ru.darkside.scaffold.domain.model.EmployeeIndicator;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;

@Projection(types = {Employee.class})
public interface EmployeeRevisionProjection {

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

  EmployeeIndicator getIndicators();

}
