package ru.darkside.scaffold.security.service.annotation;

import ru.darkside.scaffold.security.service.Role;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RunAsUser {

  String name() default "anonymous";

  String password() default "";

  Role[] roles() default {};
}
