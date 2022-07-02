package ru.darkside.scaffold.domain.repository.event;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;
import ru.darkside.scaffold.domain.model.Employee;
import ru.darkside.scaffold.domain.repository.*;
import ru.darkside.scaffold.generator.*;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@Component
@RequiredArgsConstructor
@RepositoryEventHandler
public class EmployeeRepositoryEventHandler {

    private final NominationRepository nominationRepository;
    private final ProjectRepository projectRepository;
    private final DepartmentRepository departmentRepository;
    private final GratitudeRepository gratitudeRepository;
    private final EmployeeRoleRepository employeeRoleRepository;
    private final ModificationSourceRepository modificationSourceRepository;
    private final EmployeePostRepository employeePostRepository;

    @HandleBeforeCreate
    public void beforeCreate(Employee employee) {

        var randomEmployeeDepartment = new RandomDepartment(StreamSupport.stream(
                departmentRepository.findAll().spliterator(), false).collect(Collectors.toList()));
        var randomProjectInvolvements = new RandomProjectInvolvements(StreamSupport.stream(
                projectRepository.findAll().spliterator(), false).collect(Collectors.toList()));
        var randomEmployeeIndicators = new RandomEmployeeIndicators();
        var randomEmployeeYearPerformance = new RandomEmployeeYearPerformance();
        var randomEmployeeGratitudes = new RandomEmployeeGratitudes(StreamSupport.stream(
                gratitudeRepository.findAll().spliterator(), false).collect(Collectors.toList()));
        var randomNominations = new RandomNominations(StreamSupport.stream(
                nominationRepository.findAll().spliterator(), false).collect(Collectors.toList()));
        var randomWorkingDaysGenerator = new RandomWorkingDayGenerator();
        var randomEmployeeRole = new RandomEmployeeRole(StreamSupport.stream(
                employeeRoleRepository.findAll().spliterator(), false).collect(Collectors.toList()));
        var randomEmployeePost = new RandomEmployeePost(StreamSupport.stream(
                employeePostRepository.findAll().spliterator(), false).collect(Collectors.toList()));

        if (employee.getDepartment() == null) {
            employee.setDepartment(randomEmployeeDepartment.get());
        }
        if (employee.getRole() == null) {
            employee.setRole(randomEmployeeRole.get());
        }
        if (employee.getPost() == null) {
            employee.setPost(randomEmployeePost.get());
        }
        if (employee.getEnabled() == null) {
            employee.setEnabled(true);
        }

        employee.setModificationSource(modificationSourceRepository.findByCode("HAND_INPUT").get());
        employee.setNominations(randomNominations.get());

        employee.setPerformanceByYear(randomEmployeeYearPerformance.get());
        employee.setGratitudes(randomEmployeeGratitudes.get());
        employee.setProjectInvolvements(randomProjectInvolvements.get());
        employee.setWorkingDays(randomWorkingDaysGenerator.get());

        if (employee.getIndicators() == null) {
            employee.setIndicators(randomEmployeeIndicators.get());
        }
        if (employee.getDiscordLogin() == null) {
            employee.setDiscordLogin(employee.getFirstName());
        }
        if (employee.getDiscordLogin() == null) {
            employee.setDiscordLogin(employee.getFirstName());
        }

        employee.setUpdateCounter(0);


    }

    @HandleBeforeSave
    public void beforeSave(Employee employee) {
        var randomEmployeeDepartment = new RandomDepartment(StreamSupport.stream(
                departmentRepository.findAll().spliterator(), false).collect(Collectors.toList()));
        var randomEmployeeRole = new RandomEmployeeRole(StreamSupport.stream(
                employeeRoleRepository.findAll().spliterator(), false).collect(Collectors.toList()));

        if (employee.getDepartment() == null) {
            employee.setDepartment(randomEmployeeDepartment.get());
        }
        if (employee.getRole() == null) {
            employee.setRole(randomEmployeeRole.get());
        }

        employee.setModificationSource(modificationSourceRepository.findByCode("HAND_INPUT").get());

        employee.setUpdateCounter(employee.getUpdateCounter()+1);
    }
}
