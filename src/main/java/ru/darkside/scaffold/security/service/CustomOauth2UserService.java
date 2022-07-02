package ru.darkside.scaffold.security.service;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import ru.darkside.scaffold.domain.model.Role;
import ru.darkside.scaffold.domain.model.User;
import ru.darkside.scaffold.domain.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class CustomOauth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        var oauth2User = super.loadUser(userRequest);

        log.debug(">>> clientRegistration: " + userRequest.getClientRegistration().toString());

        var discordUserInfo = new DiscordUserInfo(oauth2User.getAttributes());

        var user = new User();
        user.setUsername(discordUserInfo.getUsername());
        user.setEnabled(true);
        oauth2User.getAuthorities().forEach(grantedAuthority -> {
            user.getRoles().add(new Role(grantedAuthority.getAuthority()));
        });

        if (userRepository.findByUsername(user.getUsername()).isEmpty()) {
            log.debug(">>> new user will be added: " + user.getUsername());
            userRepository.save(user);
        }

        return oauth2User;
    }

    @Data
    @RequiredArgsConstructor
    static class DiscordUserInfo {

        public DiscordUserInfo(Map<String, Object> attrs) {
            username = (String) attrs.get("username");
        }

        private final String username;

        private final List<String> roles = new ArrayList<>();
    }
}
