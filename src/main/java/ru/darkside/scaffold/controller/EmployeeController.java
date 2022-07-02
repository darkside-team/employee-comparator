package ru.darkside.scaffold.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.history.Revisions;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.darkside.scaffold.domain.model.Employee;
import ru.darkside.scaffold.domain.model.projection.EmployeeRevisionProjection;
import ru.darkside.scaffold.domain.repository.EmployeeRepository;

import javax.transaction.Transactional;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Slf4j
@RequiredArgsConstructor
@RepositoryRestController
@Transactional
public class EmployeeController {

  private final EmployeeRepository repository;

  private final ProjectionFactory projectionFactory;

  @RequestMapping(method = RequestMethod.GET, value = "/employees/{id}/revisions")
  public @ResponseBody ResponseEntity<?> getRevisions(@PathVariable Long id) {
    log.debug(">>> try to find revisions by id: " + id);

    Revisions<Integer, Employee> revisions = repository.findRevisions(id);

    CollectionModel<RepresentationModel<EmployeeRevisionMetadataModel>> resources =
            CollectionModel.of(
                    revisions.stream()
                            .map(r -> new EmployeeRevisionMetadataModel(r.getMetadata(),
                                    projectionFactory.createProjection(EmployeeRevisionProjection.class, r.getEntity())))
                            .collect(Collectors.toList()));

    if (revisions.isEmpty()) {
      return ResponseEntity.noContent().build();
    }

    resources.add(linkTo(methodOn(EmployeeController.class).getRevisions(id)).withSelfRel());

    return ResponseEntity.ok(resources);
  }
}
