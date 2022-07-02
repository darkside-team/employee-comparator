package ru.darkside.scaffold.generator;

import lombok.RequiredArgsConstructor;
import ru.darkside.scaffold.domain.model.Nomination;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class RandomNominations {

    private final Random rnd = new Random();
    private final List<Nomination> nominations;

    public List<Nomination> get() {
        return nominations.stream().filter((g) -> rnd.nextBoolean()).collect(Collectors.toList());
    }
}
