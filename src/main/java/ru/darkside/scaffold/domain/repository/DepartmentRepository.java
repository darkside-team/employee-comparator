package ru.darkside.scaffold.domain.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import ru.darkside.scaffold.domain.model.Department;

@Repository
@RepositoryRestResource
public interface DepartmentRepository extends CrudRepository<Department, Long> {
}
