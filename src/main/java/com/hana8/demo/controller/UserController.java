package com.hana8.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hana8.demo.dto.User;
import com.hana8.demo.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequestMapping("/users")
@RestController
@RequiredArgsConstructor
public class UserController {
	private final UserService service;

	@GetMapping("")
	public List<User> getUserList() {
		return service.getUsers();
	}

	@GetMapping("/{id}")
	public User getUser(@PathVariable Integer id) {
		return service.getUser(id);
	}

	@PostMapping("")
	public Integer addUser(@Valid @RequestBody User user) {
		System.out.println("user = " + user);
		user.setId(0);
		return service.registerUser(user);
	}

	@PutMapping("/{id}")
	public User editUser(@PathVariable Integer id, @RequestBody User user) {
		user.setId(id);
		return service.editUser(user);
	}

	@DeleteMapping("/{id}")
	public Integer withdraw(@PathVariable("id") int id) {
		return service.removeUser(id);
	}
}
