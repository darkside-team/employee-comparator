package ru.darkside.scaffold.generator;

import ru.darkside.scaffold.domain.model.EmployeeIndicator;

import java.util.Random;

public class RandomEmployeeIndicators {

    private final Random rnd = new Random();

    public EmployeeIndicator get() {
        return EmployeeIndicator.builder()
                .qualityCurrValue(rnd.nextInt(100))
                .qualityPrevValue(rnd.nextInt(100))
                .performanceCurrValue(rnd.nextInt(100))
                .performancePrevValue(rnd.nextInt(100))
                .efficiencyPrevValue(rnd.nextInt(100))
                .efficiencyCurrValue(rnd.nextInt(100))
                .avgTaskComplexity(rnd.nextInt(10))
                .avgTaskCount(rnd.nextInt(10))
                .umkIndicator1(rnd.nextInt(3)+1)
                .umkIndicator2(rnd.nextInt(3)+1)
                .umkIndicator3(rnd.nextInt(3)+1)
                .umkIndicator4(rnd.nextInt(3)+1)
                .umkIndicator5(rnd.nextInt(3)+1)
                .umkIndicator6(rnd.nextInt(3)+1)
                .umkIndicator7(rnd.nextInt(3)+1)
                .umkIndicator8(rnd.nextInt(3)+1)
                .umkIndicator9(rnd.nextInt(3)+1)
                .trainingDayCount(rnd.nextInt(10)).build();
    }

}
