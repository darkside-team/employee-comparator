package ru.darkside.scaffold.domain.repository;

import com.querydsl.core.types.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.history.Revisions;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.history.RevisionRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import ru.darkside.scaffold.domain.model.Employee;

import java.util.List;
import java.util.Optional;

@Repository
@RepositoryRestResource
public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long>,
        QuerydslPredicateExecutor<Employee>, RevisionRepository<Employee, Long, Integer> {

    @Override
    @EntityGraph(value = "employee", type = EntityGraph.EntityGraphType.FETCH)
    Page<Employee> findAll(Predicate var1, Pageable var2);

    @Override
    @EntityGraph(value = "employee", type = EntityGraph.EntityGraphType.FETCH)
    List<Employee> findAll();

    @Override
    @EntityGraph(value = "employee", type = EntityGraph.EntityGraphType.FETCH)
    Optional<Employee> findById(Long id);
}
