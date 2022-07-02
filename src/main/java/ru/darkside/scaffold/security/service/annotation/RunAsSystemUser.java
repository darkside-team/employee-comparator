package ru.darkside.scaffold.security.service.annotation;

import ru.darkside.scaffold.security.service.Role;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@RunAsUser(name = "admin", password = "12345", roles = Role.ROLE_ADMIN)
public @interface RunAsSystemUser {
}
