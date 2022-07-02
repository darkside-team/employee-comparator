package ru.darkside.scaffold.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelProcessor;
import ru.darkside.scaffold.controller.EmployeeController;
import ru.darkside.scaffold.domain.model.projection.EmployeeProjection;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Slf4j
@Configuration(proxyBeanMethods = false)
public class RepresentationModelConfig {

    @Bean
    public SpelAwareProxyProjectionFactory projectionFactory() {
        return new SpelAwareProxyProjectionFactory();
    }

    @Bean
    public RepresentationModelProcessor<EntityModel<EmployeeProjection>> employeeProjectionProcessor() {
        return new RepresentationModelProcessor<EntityModel<EmployeeProjection>>() {

            @Override
            public EntityModel<EmployeeProjection> process(EntityModel<EmployeeProjection> model) {
                return model.add(linkTo(methodOn(EmployeeController.class).getRevisions(model.getContent().getId())).withRel("revisions"));
            }
        };
    }

}
