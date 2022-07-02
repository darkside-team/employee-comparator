package ru.darkside.scaffold.domain.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import ru.darkside.scaffold.domain.model.service.GrowthCalculator;

public class GrowthCalculatorTest {

    @Test
    public void calculateGrowthWillSuccess() {
        Assertions.assertEquals(25, new GrowthCalculator().apply(40, 50));
        Assertions.assertEquals(-1, new GrowthCalculator().apply(0, 50));
        Assertions.assertEquals(-100, new GrowthCalculator().apply(40, 0));
        Assertions.assertEquals(0, new GrowthCalculator().apply(0, 0));
    }
}
