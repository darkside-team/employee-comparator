package ru.darkside.scaffold.generator;

import ru.darkside.scaffold.domain.model.EmployeeYearPerformance;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class RandomEmployeeYearPerformance {

    private final Random rnd = new Random();

    public List<EmployeeYearPerformance> get() {
        List<EmployeeYearPerformance> data = new ArrayList<>(12);
        for (int i = 0; i < 12; i++) {
            data.add(new EmployeeYearPerformance(rnd.nextInt(100), "month_"+i));
        }
        return data;
    }
}
