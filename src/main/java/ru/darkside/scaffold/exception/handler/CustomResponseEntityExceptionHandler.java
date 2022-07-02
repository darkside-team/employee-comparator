package ru.darkside.scaffold.exception.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.rest.core.RepositoryConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@ControllerAdvice
@RequiredArgsConstructor
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    private final ProjectionFactory projectionFactory;

    @ExceptionHandler({IllegalStateException.class, NullPointerException.class})
    public ResponseEntity<Object> handleIllegalStateException(IllegalStateException exception) {
        return new ResponseEntity<>(projectionFactory.createProjection(ObjectErrorProjection.class,  new ObjectError("", exception.getMessage()))
                , new HttpHeaders(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler({ RepositoryConstraintViolationException.class })
    public ResponseEntity<Object> handleRepositoryConstraintViolationException(RepositoryConstraintViolationException exception) {
        List<Object> errors = new ArrayList<>();

        exception.getErrors().getFieldErrors().forEach(e -> log.debug(">>> error: " + e.toString()));


        exception.getErrors().getFieldErrors().forEach(e -> errors.add( projectionFactory.createProjection(FieldErrorProjection.class, e)));
        exception.getErrors().getGlobalErrors().forEach(e -> errors.add(projectionFactory.createProjection(ObjectErrorProjection.class, e)));

        return new ResponseEntity<>(errors, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ ConstraintViolationException.class })
    public ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException  exception) {
        return new ResponseEntity<>(exception.getConstraintViolations()
                .stream()
                .map(c -> projectionFactory.createProjection(ConstraintViolationProjection.class, c))
                .collect(Collectors.toList()),
                new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }
}
