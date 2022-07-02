package ru.darkside.scaffold.domain.model;

import lombok.*;
import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.AbstractPersistable;
import ru.darkside.scaffold.domain.model.service.GrowthCalculator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PostLoad;
import javax.persistence.Transient;
import java.util.function.BiFunction;

@Builder
@Getter
@Setter
@Entity
@Audited
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeIndicator extends AbstractPersistable<Long> {

    private static final BiFunction<Integer, Integer, Integer> growthCalculator = new GrowthCalculator();

    @Column
    private Integer performanceCurrValue;

    @Column
    private Integer performancePrevValue;

    @Column
    private Integer qualityCurrValue;

    @Column
    private Integer qualityPrevValue;

    @Column
    private Integer efficiencyCurrValue;

    @Column
    private Integer efficiencyPrevValue;

    @Column
    private Integer avgTaskCount;

    @Column
    private Integer avgTaskComplexity;

    @Column
    private Integer trainingDayCount;

    @Column
    private Integer umkIndicator1;
    @Column
    private Integer umkIndicator2;
    @Column
    private Integer umkIndicator3;
    @Column
    private Integer umkIndicator4;
    @Column
    private Integer umkIndicator5;
    @Column
    private Integer umkIndicator6;
    @Column
    private Integer umkIndicator7;
    @Column
    private Integer umkIndicator8;
    @Column
    private Integer umkIndicator9;
    @Transient
    private Integer qualityGrowth;

    @Transient
    private Integer performanceGrowth;

    @Transient
    private Integer efficiencyGrowth;

    @PostLoad
    protected void postLoad() {
        calculateQualityGrowth();
        calculatePerformanceGrowth();
        calculateEfficiencyGrowth();
    }

    protected void calculateQualityGrowth() {
        qualityGrowth = growthCalculator.apply(qualityPrevValue, qualityCurrValue);
    }

    protected void calculatePerformanceGrowth() {
        performanceGrowth = growthCalculator.apply(performancePrevValue, performanceCurrValue);
    }

    protected void calculateEfficiencyGrowth() {
        efficiencyGrowth = growthCalculator.apply(efficiencyPrevValue, efficiencyCurrValue);
    }


}
