package ru.darkside.scaffold.generator;

import lombok.RequiredArgsConstructor;
import ru.darkside.scaffold.domain.model.EmployeePost;

import java.util.List;
import java.util.Random;

@RequiredArgsConstructor
public class RandomEmployeePost {

    private final List<EmployeePost> posts;
    private final static Random rnd = new Random();

    public EmployeePost get() {
        return posts.get(rnd.nextInt(posts.size()));
    }
}
