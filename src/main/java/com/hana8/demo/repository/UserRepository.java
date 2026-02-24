package com.hana8.demo.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.hana8.demo.dto.User;

@Repository
public class UserRepository {
	private final List<User> users = new ArrayList<>();

	public List<User> findAllUsers() {
		return users;
	}

	public Integer createUser(User user) {
		int id = users.stream().mapToInt(User::getId).max().orElse(0) + 1;
		user.setId(id);
		users.add(user);
		return id;
	}

	public User updateUser(User user) {
		return users.stream().filter(_user -> _user.getId() == user.getId()).peek(oldUser -> {
			oldUser.setUsername(user.getUsername());
			oldUser.setEmail(user.getEmail());
			oldUser.setTel(user.getTel());

		}).findFirst().orElse(null);
		// User oldUser = users.stream()
		// 	.filter(u -> u.getId() == user.getId())
		// 	.findFirst()
		// 	.orElse(null);
		// if (oldUser == null)
		// 	return null;
		// oldUser.setUsername(user.getUsername());
		// oldUser.setEmail(user.getEmail());
		// oldUser.setTel(user.getTel());
	}

	public Integer deleteUser(Integer id) {
		// users.removeIf(u -> u.getId() == id);
		return users.stream().filter(_user -> _user.getId() == id).findFirst().map(_user -> {
			users.remove(_user);
			return 1;
		}).orElse(0);
		// Optional<User> user = users.stream().filter(u -> u.getId() == id).findFirst();
		// user.ifPresent(users::remove);
		// if (user.isEmpty())
		// 	return 0;
		//
		// user.ifPresent(users::remove);
		// return 1;
	}

	public User findUser(Integer id) {
		return users.stream().filter(u -> u.getId() == id).findFirst().orElse(null);
	}
}
