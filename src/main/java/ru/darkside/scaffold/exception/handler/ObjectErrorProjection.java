package ru.darkside.scaffold.exception.handler;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;
import org.springframework.validation.ObjectError;

@Projection(name = "objectErrorProjection", types = ObjectError.class)
public interface ObjectErrorProjection {

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.defaultMessage}")
    String getMessage();

}
