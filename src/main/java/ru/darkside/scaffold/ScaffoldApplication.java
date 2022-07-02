package ru.darkside.scaffold;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@SpringBootApplication
public class ScaffoldApplication {

	public static void main(String[] args) {
		SpringApplication.run(ScaffoldApplication.class, args);
	}

	@Slf4j
	@RestController
	public static class AuthDetailController {

		@GetMapping("/api/whoami")
		public LoggedIn whoami(Principal principal) {
			var auth = SecurityContextHolder.getContext().getAuthentication();
			return new LoggedIn(principal.getName(),
					auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()));
		}

		@GetMapping("/api/authenticationDetails")
		public Authentication authenticationDetails(Principal principal) {
			return SecurityContextHolder.getContext().getAuthentication();
		}

		@RequiredArgsConstructor
		@Getter
		static class LoggedIn {
			private final String username;
			private final List<String> roles;
		}
	}
}
