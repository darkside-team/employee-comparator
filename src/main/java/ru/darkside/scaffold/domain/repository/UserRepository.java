package ru.darkside.scaffold.domain.repository;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.history.RevisionRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import ru.darkside.scaffold.domain.model.User;

import java.util.Optional;

@Repository
@RepositoryRestResource
public interface UserRepository extends PagingAndSortingRepository<User, Long>,
        QuerydslPredicateExecutor<User>,
        RevisionRepository<User, Long, Integer> {

    Optional<User> findByUsername(String login);
}
