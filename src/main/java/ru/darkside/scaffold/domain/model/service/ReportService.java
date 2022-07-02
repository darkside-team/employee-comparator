package ru.darkside.scaffold.domain.model.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.history.Revision;
import org.springframework.stereotype.Service;
import ru.darkside.scaffold.domain.model.Department;
import ru.darkside.scaffold.domain.model.Employee;
import ru.darkside.scaffold.domain.repository.DepartmentRepository;
import ru.darkside.scaffold.domain.repository.EmployeeRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    public List<Department> showAllDepartments() {
        List<Department> departments = (List<Department>) departmentRepository.findAll();
        return departments;
    }

    public List<Employee> showAllEmployees(Long id) {
        List<Employee> employees = employeeRepository.findRevisions(id).stream().map(Revision::getEntity).collect(Collectors.toList());
        return employees;
    }

    public Optional<Employee> findEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public List<Employee> showAllEmployeesBetweenDate(Long id, LocalDate startDate,
                                                      LocalDate endDate) {
        if (startDate == null && endDate == null) {
            return showAllEmployees(id);
        } else if (startDate == null) {
            return showAllEmployeesBetweenDate(
                    id,
                    LocalDate.MIN,
                    endDate
            );
        } else if (endDate == null) {
            return showAllEmployeesBetweenDate(
                    id,
                    startDate,
                    LocalDate.MAX
            );
        }
        return employeeRepository.findRevisions(id).stream()
                .map(Revision::getEntity)
                .filter(o -> o.getModifiedDate().isAfter(LocalDateTime.of(startDate, LocalTime.MIDNIGHT)))
                .filter(o -> o.getModifiedDate().isBefore(LocalDateTime.of(endDate, LocalTime.MIDNIGHT)))
                .collect(Collectors.toList())
                ;
    }
}
