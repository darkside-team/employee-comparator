package ru.darkside.scaffold.domain.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import ru.darkside.scaffold.domain.model.ModificationSource;

import java.util.Optional;

@Repository
@RepositoryRestResource
public interface ModificationSourceRepository extends CrudRepository<ModificationSource, Long> {

    Optional<ModificationSource> findByCode(String code);
}
