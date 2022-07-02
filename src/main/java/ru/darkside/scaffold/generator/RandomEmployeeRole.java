package ru.darkside.scaffold.generator;

import lombok.RequiredArgsConstructor;
import ru.darkside.scaffold.domain.model.EmployeeRole;

import java.util.List;
import java.util.Random;

@RequiredArgsConstructor
public class RandomEmployeeRole {

    private final Random rnd = new Random();
    private final List<EmployeeRole> employeeRoles;

    public EmployeeRole get() {
        return employeeRoles.get(rnd.nextInt(employeeRoles.size()));
    }
}
