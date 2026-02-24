package com.hana8.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

// @Log4j2
@Slf4j
@RestController
public class HelloController {
	// private static final Logger log = LoggerFactory.getLogger(DemoApplication.class);

	@RequestMapping("/")
	public String index() {
		return "Hana8 SpringBoot Demo";
	}

	@GetMapping
	public String hello() {
		return "Hello, World";
	}

	@GetMapping("/hello-servlet")
	public String helloServlet(String name) {
		log.info("INFO: {} - {}", name, 123);
		// 아래와 같이 하면 성능이 너무 안좋다. -> 문자열 연산에 CPU를 쓰기 떄문에!
		// log.info("DEBUG", name, 123);
		log.warn("WARN", name, 123);
		log.debug("DEBUG", name, 123);
		log.error("ERROR", name, 123);
		return "Hello, Servlet " + name;
	}
}
