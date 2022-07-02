package ru.darkside.scaffold.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import ru.darkside.scaffold.domain.repository.UserRepository;
import ru.darkside.scaffold.security.service.CustomOauth2UserService;
import ru.darkside.scaffold.security.service.CustomUserDetailManager;
import ru.darkside.scaffold.security.service.CustomUserDetailService;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Slf4j
@Configuration(proxyBeanMethods = false)
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Profile("dev")
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PATCH");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");
        source.registerCorsConfiguration("/api/**", config);
        return new CorsFilter(source);
    }

    @Bean
    @Profile("dev")
    protected SecurityFilterChain defaultSecurityFilterChainForDev(HttpSecurity http, UserDetailsService userDetailsService) throws Exception {
        http
            .csrf().disable()
            .cors(Customizer.withDefaults())
            .headers().frameOptions().disable()
            .and()
                .authorizeRequests(request -> request
                        .antMatchers( "/built/**", "/style/**", "/static/**", "/h2-console/**", "/explorer/**", "/favicon.ico", "/login**").permitAll()
                        //.antMatchers("/api/**").permitAll()
                        .anyRequest().authenticated()
                )
            //.httpBasic(Customizer.withDefaults())
            .formLogin(Customizer.withDefaults())
            .logout().logoutSuccessUrl("/");
        return http.build();
    }


    @Profile("dev")
    @Bean
    UserDetailsService userDetailsService(UserRepository userRepository) {
        return new CustomUserDetailService(userRepository);
    }


    @Profile("dev")
    @Bean
    public DaoAuthenticationProvider authProvider(UserDetailsService userDetailsService) {
        final DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        return authProvider;
    }

    @Profile("dev")
    @Bean
    UserDetailsManager users(UserRepository userRepository) {
        UserDetails krivonosovav = User.builder()
                .username("krivonosovav")
                .password("{bcrypt}$2a$10$GRLdNijSQMUvl/au9ofL.eDwmoohzzS7.rmNSJZ.0FxO/BTk76klW")
                .roles("USER")
                .build();
        UserDetails prokofievmv = User.builder()
                .username("prokofievmv")
                .password("{bcrypt}$2a$10$GRLdNijSQMUvl/au9ofL.eDwmoohzzS7.rmNSJZ.0FxO/BTk76klW")
                .roles("USER")
                .build();
        UserDetails rijkinada = User.builder()
                .username("rijkinada")
                .password("{bcrypt}$2a$10$GRLdNijSQMUvl/au9ofL.eDwmoohzzS7.rmNSJZ.0FxO/BTk76klW")
                .roles("USER")
                .build();
        UserDetails admin = User.builder()
                .username("admin")
                .password("{bcrypt}$2a$10$GRLdNijSQMUvl/au9ofL.eDwmoohzzS7.rmNSJZ.0FxO/BTk76klW")
                .roles("USER", "ADMIN")
                .build();
        UserDetailsManager users = new CustomUserDetailManager(userRepository);
        users.createUser(krivonosovav);
        users.createUser(prokofievmv);
        users.createUser(rijkinada);
        users.createUser(admin);
        return users;
    }

    /*
    @Profile("dev")
    @Bean
    UserDetailsManager users(DataSource dataSource) {
        UserDetails user = User.builder()
                .username("krivonosovav")
                .password("{bcrypt}$2a$10$GRLdNijSQMUvl/au9ofL.eDwmoohzzS7.rmNSJZ.0FxO/BTk76klW")
                .roles("USER")
                .build();
        UserDetails admin = User.builder()
                .username("admin")
                .password("{bcrypt}$2a$10$GRLdNijSQMUvl/au9ofL.eDwmoohzzS7.rmNSJZ.0FxO/BTk76klW")
                .roles("USER", "ADMIN")
                .build();
        JdbcUserDetailsManager users = new JdbcUserDetailsManager(dataSource);
        users.createUser(user);
        users.createUser(admin);
        return users;
    }
    */

    /*
    @Bean
    @Profile("dev")
    public UserDetailsService users() {
        // The builder will ensure the passwords are encoded before saving in memory
        User.UserBuilder users = User.withDefaultPasswordEncoder();
        UserDetails user = users
                .username("krivonosovav")
                .password("12345")
                .roles("USER")
                .build();
        UserDetails admin = users
                .username("admin")
                .password("12345")
                .roles("USER", "ADMIN")
                .build();
        return new InMemoryUserDetailsManager(user, admin);
    }
    */

    @Bean
    @Profile("prod")
    CustomOauth2UserService customOauth2UserService(UserRepository userRepository) {
        return new CustomOauth2UserService(userRepository);
    }

    @Bean
    @Profile("prod")
    protected SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http, CustomOauth2UserService userService) throws Exception {
        log.debug(">>> configure security filter chain");
        http
            .csrf().disable()
            .httpBasic().disable()
            .formLogin().disable()
            .cors(Customizer.withDefaults())
            .authorizeRequests(request -> request
                    .antMatchers("/h2-console/**", "/explorer/**", "/logout*", "/favicon.ico").permitAll()
                    .antMatchers("/login*", "/oauth2/authorization/discord").anonymous()
                    .anyRequest().authenticated()
            )
            .headers().frameOptions().disable()
            .and()
                .logout().logoutSuccessUrl("/")
            .and()
                //.oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
                .oauth2Login().userInfoEndpoint()
                    .userAuthoritiesMapper(userAuthoritiesMapper())
                    .userService(userService)
        ;
        return http.build();
    }

    private GrantedAuthoritiesMapper userAuthoritiesMapper() {
        return (authorities) -> {
            log.debug(">>> extract user authorities");
            Set<GrantedAuthority> mappedAuthorities = new HashSet<>();

            authorities.forEach(authority -> {
                mappedAuthorities.add(authority);

                if (OidcUserAuthority.class.isInstance(authority)) {
                    OidcUserAuthority oidcUserAuthority = (OidcUserAuthority)authority;

                    OidcIdToken idToken = oidcUserAuthority.getIdToken();
                    OidcUserInfo userInfo = oidcUserAuthority.getUserInfo();

                    // Map the claims found in idToken and/or userInfo
                    // to one or more GrantedAuthority's and add it to mappedAuthorities

                } else if (OAuth2UserAuthority.class.isInstance(authority)) {
                    OAuth2UserAuthority oauth2UserAuthority = (OAuth2UserAuthority)authority;

                    Map<String, Object> userAttributes = oauth2UserAuthority.getAttributes();

                    // Map the attributes found in userAttributes
                    // to one or more GrantedAuthority's and add it to mappedAuthorities

                }
            });

            return mappedAuthorities;
        };
    }
}
