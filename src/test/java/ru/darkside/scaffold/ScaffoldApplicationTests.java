package ru.darkside.scaffold;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {"employee.data.generation.enabled=false"})
class ScaffoldApplicationTests {

	@Test
	void contextLoads() {
	}

}
