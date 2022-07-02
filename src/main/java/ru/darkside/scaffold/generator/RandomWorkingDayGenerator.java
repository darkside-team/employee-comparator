package ru.darkside.scaffold.generator;

import ru.darkside.scaffold.domain.model.EmployeeWorkingDay;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class RandomWorkingDayGenerator {

    private final Random rnd = new Random();

    private static final String[] months = new String[] {
            "Май","Июнь", "Июль"
    };

    public List<EmployeeWorkingDay> get() {
        var results = new ArrayList<EmployeeWorkingDay>();

        for (String month : months) {
            results.add(new EmployeeWorkingDay(rnd.nextInt(30), rnd.nextInt(30), rnd.nextInt(30), month));
        }
        return results;
    }
}
