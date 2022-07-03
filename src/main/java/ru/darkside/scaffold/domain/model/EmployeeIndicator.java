package ru.darkside.scaffold.domain.model;

import lombok.*;
import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.AbstractPersistable;
import ru.darkside.scaffold.domain.model.service.GrowthCalculator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PostLoad;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
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

    @NotNull
    @Column
    private Integer performanceCurrValue;

    @NotNull
    @Column
    private Integer performancePrevValue;

    @NotNull
    @Column
    private Integer qualityCurrValue;

    @NotNull
    @Column
    private Integer qualityPrevValue;

    @NotNull
    @Column
    private Integer efficiencyCurrValue;

    @NotNull
    @Column
    private Integer efficiencyPrevValue;

    @NotNull
    @Column
    private Integer avgTaskCount;

    @NotNull
    @Column
    private Integer avgTaskComplexity;

    @NotNull
    @Column
    private Integer trainingDayCount;

    @NotNull
    @Column
    private Integer umkIndicator1;

    @NotNull
    @Column
    private Integer umkIndicator2;

    @NotNull
    @Column
    private Integer umkIndicator3;

    @NotNull
    @Column
    private Integer umkIndicator4;

    @NotNull
    @Column
    private Integer umkIndicator5;

    @NotNull
    @Column
    private Integer umkIndicator6;

    @NotNull
    @Column
    private Integer umkIndicator7;

    @NotNull
    @Column
    private Integer umkIndicator8;

    @NotNull
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
