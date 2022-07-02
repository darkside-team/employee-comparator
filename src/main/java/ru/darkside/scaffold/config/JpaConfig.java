package ru.darkside.scaffold.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.envers.repository.config.EnableEnversRepositories;
import org.springframework.data.envers.repository.support.EnversRevisionRepositoryFactoryBean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import java.util.Optional;

@Slf4j
@Configuration(proxyBeanMethods = false)
@EnableTransactionManagement
@EnableEnversRepositories
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EntityScan(basePackages = {"ru.darkside.scaffold.domain.model"})
@EnableJpaRepositories(
        basePackages = {"ru.darkside.scaffold.domain.repository"},
        repositoryFactoryBeanClass = EnversRevisionRepositoryFactoryBean.class)
public class JpaConfig {

    @Primary
    @Bean(name = "transactionManager")
    protected PlatformTransactionManager transactionManager(
            @Qualifier("entityManagerFactory") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }

    @Bean
    protected AuditorAware<String> auditorAware() {
        log.debug(">>> configure auditor aware");
        return () -> {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            return Optional.of(authentication.getName());
        };
    }
}
