package ru.darkside.scaffold.exception.handler;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import javax.validation.ConstraintViolation;

@Projection(name = "constraintViolation", types = ConstraintViolation.class)
public interface ConstraintViolationProjection {

    String getMessage();

    @Value("#{target.invalidValue}")
    Object getRejectedValue();

    @Value("#{target.propertyPath.toString()}")
    String getField();

}
