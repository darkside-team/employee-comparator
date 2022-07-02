package ru.darkside.scaffold.generator;

import lombok.RequiredArgsConstructor;
import ru.darkside.scaffold.domain.model.ModificationSource;

import java.util.List;
import java.util.Random;

@RequiredArgsConstructor
public class RandomModificationSource {

    private final List<ModificationSource> modificationSources;
    private static final Random rnd = new Random();

    public ModificationSource get() {
        return modificationSources.get(rnd.nextInt(modificationSources.size()-1));
    }

}
