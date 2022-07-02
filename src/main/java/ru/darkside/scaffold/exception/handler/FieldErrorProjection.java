package ru.darkside.scaffold.exception.handler;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;
import org.springframework.validation.FieldError;

@Projection(name = "constraintViolation", types = FieldError.class)
public interface FieldErrorProjection {

    @Value("#{target.defaultMessage}")
    String getMessage();

    Object getRejectedValue();

    String getField();
}
