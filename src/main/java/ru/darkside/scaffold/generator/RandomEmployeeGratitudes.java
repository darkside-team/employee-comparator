package ru.darkside.scaffold.generator;

import lombok.RequiredArgsConstructor;
import ru.darkside.scaffold.domain.model.Employee;
import ru.darkside.scaffold.domain.model.EmployeeGratitude;
import ru.darkside.scaffold.domain.model.Gratitude;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class RandomEmployeeGratitudes {

    private final Random rnd = new Random();
    private final List<Gratitude> gratitudes;

    public List<EmployeeGratitude> get() {
        return getRandomGrantitudes()
                .stream().map(g -> new EmployeeGratitude(g, LocalDate.of(2021,1,1)))
                .collect(Collectors.toList());
    }

    private List<Gratitude> getRandomGrantitudes() {
        return gratitudes.stream().filter((g) -> rnd.nextBoolean()).collect(Collectors.toList());
    }
}
