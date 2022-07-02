package ru.darkside.scaffold.security.service.annotation;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Aspect
@Component
@Slf4j
public class RunAsSystemUserAspect {

  @Around("@annotation(ru.darkside.scaffold.security.service.annotation.RunAsSystemUser)")
  public Object runAsSystemUser(ProceedingJoinPoint joinPoint) throws Throwable {
    MethodSignature signature = (MethodSignature) joinPoint.getSignature();
    Method method = signature.getMethod();

    RunAsUser anno = method.getAnnotation(RunAsSystemUser.class).annotationType().getDeclaredAnnotation(RunAsUser.class);

    Authentication currentAuth = SecurityContextHolder.getContext().getAuthentication();
    try {
      if (currentAuth == null ||
              !currentAuth.getPrincipal().toString().equals(anno.name())) {

        List<GrantedAuthority> grantedAuthorities = Arrays.stream(anno.roles())
                .map(Enum::name)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        Authentication auth = new UsernamePasswordAuthenticationToken(
                anno.name(),
                anno.password(),
                grantedAuthorities);

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(auth);

        SecurityContextHolder.setContext(context);
      }

      return joinPoint.proceed();
    } finally {
      SecurityContextHolder.getContext().setAuthentication(currentAuth);
    }
  }
}
