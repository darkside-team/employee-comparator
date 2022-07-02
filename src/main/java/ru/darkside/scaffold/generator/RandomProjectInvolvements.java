package ru.darkside.scaffold.generator;

import lombok.RequiredArgsConstructor;
import ru.darkside.scaffold.domain.model.EmployeeProjectInvolvement;
import ru.darkside.scaffold.domain.model.Project;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class RandomProjectInvolvements {

    private final Random rnd = new Random();
    private final List<Project> projects;

    public List<EmployeeProjectInvolvement> get() {
        var results = new ArrayList<EmployeeProjectInvolvement>();
        var randomProjects = projects.stream().filter(p -> rnd.nextBoolean()).collect(Collectors.toList());

        int count = 100;

        for (int i = 0; i < randomProjects.size(); i++) {
            var p = randomProjects.get(i);
            int v = count;
            if ((i + 1) < randomProjects.size()) {
                v = rnd.nextInt(count/2) + 1;
                count = count - v;
            }
            results.add(new EmployeeProjectInvolvement(p, v));
        };
        return results;
    }
}
