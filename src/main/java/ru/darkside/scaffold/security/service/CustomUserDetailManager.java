package ru.darkside.scaffold.security.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.provisioning.UserDetailsManager;
import ru.darkside.scaffold.domain.model.Role;
import ru.darkside.scaffold.domain.model.User;
import ru.darkside.scaffold.domain.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class CustomUserDetailManager implements UserDetailsManager {

    private final UserRepository userRepository;
    @Override
    public void createUser(UserDetails user) {
        var u = User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(new ArrayList<>())
                .enabled(true)
                .build();

        user.getAuthorities().forEach(grantedAuthority -> {
            u.getRoles().add(new Role(grantedAuthority.getAuthority()));
        });

        userRepository.save(u);
    }

    @Override
    public void updateUser(UserDetails user) {
        userRepository.findByUsername(user.getUsername()).ifPresent(
                u -> {
            u.setUsername(user.getUsername());
            u.setPassword(user.getPassword());
            u.setEnabled(user.isEnabled());

            user.getAuthorities().forEach(grantedAuthority -> {
                u.getRoles().add(new Role(grantedAuthority.getAuthority()));
            });

            userRepository.save(u);

        });
    }

    @Override
    public void deleteUser(String username) {
        userRepository.findByUsername(username).ifPresent(userRepository::delete);
    }

    @Override
    public void changePassword(String oldPassword, String newPassword) {
        var currentUser = SecurityContextHolder.getContext().getAuthentication();
        if (currentUser != null) {
            var username = currentUser.getName();
            userRepository.findByUsername(username).ifPresent(user -> {
                user.setPassword(newPassword);
                userRepository.save(user);

                Authentication authentication = createNewAuthentication(currentUser, newPassword);
                SecurityContext context = SecurityContextHolder.createEmptyContext();
                context.setAuthentication(authentication);
                SecurityContextHolder.setContext(context);
            });
        }
    }

    @Override
    public boolean userExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("user not found by name: " + username));

        List<GrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getRoleName())));
        return new org.springframework.security.core.userdetails.User(user.getUsername(),
                user.getPassword(), user.isEnabled(),
                true, true,
                true, authorities);
    }

    protected Authentication createNewAuthentication(Authentication currentAuth, String newPassword) {
        UserDetails user = loadUserByUsername(currentAuth.getName());
        UsernamePasswordAuthenticationToken newAuthentication = new UsernamePasswordAuthenticationToken(user, null,
                user.getAuthorities());
        newAuthentication.setDetails(currentAuth.getDetails());
        return newAuthentication;
    }
}
