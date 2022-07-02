package ru.darkside.scaffold.domain.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class EmployeeIndicatorTest {

    @Test
    public void performanceGrowthTest() {
        var i = EmployeeIndicator.builder().performancePrevValue(40).performanceCurrValue(50).build();
        i.calculatePerformanceGrowth();
        Assertions.assertEquals(25, i.getPerformanceGrowth());
    }

    @Test
    public void qualityGrowthTest() {
        var i = EmployeeIndicator.builder().qualityPrevValue(50).qualityCurrValue(40).build();
        i.calculateQualityGrowth();
        Assertions.assertEquals(-20, i.getQualityGrowth());
    }

    @Test
    public void efficiencyGrowthTest() {
        var i = EmployeeIndicator.builder().efficiencyCurrValue(50).efficiencyPrevValue(40).build();
        i.calculateEfficiencyGrowth();
        Assertions.assertEquals(25, i.getEfficiencyGrowth());
    }
}
