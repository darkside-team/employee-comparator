package ru.darkside.scaffold.domain.model.service;

import java.util.function.BiFunction;

public class GrowthCalculator implements BiFunction<Integer, Integer, Integer> {

    @Override
    public Integer apply(Integer prev, Integer current) {
        var x1 = Double.valueOf(prev);
        var x2 = Double.valueOf(current);

        return (int)Math.round(((x2-x1)/x1)*100);
    }
}
