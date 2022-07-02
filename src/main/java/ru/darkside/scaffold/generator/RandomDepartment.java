package ru.darkside.scaffold.generator;

import lombok.RequiredArgsConstructor;
import ru.darkside.scaffold.domain.model.Department;

import java.util.List;
import java.util.Random;

@RequiredArgsConstructor
public class RandomDepartment {

    private final Random rnd = new Random();
    private final List<Department> departments;

    public Department get() {
        return departments.get(rnd.nextInt(departments.size()));
    }
}
