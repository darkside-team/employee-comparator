package ru.darkside.scaffold.domain.repository.event;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;
import ru.darkside.scaffold.domain.model.Role;
import ru.darkside.scaffold.domain.model.User;
import ru.darkside.scaffold.domain.repository.UserRepository;

@Slf4j
@Component
@RequiredArgsConstructor
@RepositoryEventHandler
public class UserRepositoryEventHandler {

    private final UserRepository userRepository;

    @HandleBeforeCreate
    public void beforeCreate(User user) {
        user.getRoles().add(new Role("ROLE_USER"));
        user.setPassword("{bcrypt}$2a$10$GRLdNijSQMUvl/au9ofL.eDwmoohzzS7.rmNSJZ.0FxO/BTk76klW");
    }
}
