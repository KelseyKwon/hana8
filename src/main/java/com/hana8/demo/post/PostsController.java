package com.hana8.demo.post;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hana8.demo.dto.Posts;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping({"/posts", "/posts/list"})
@RequiredArgsConstructor
public class PostsController {
	private final PostsService service;

	@GetMapping("")
	public List<Posts> getPostList(HttpServletRequest req) {
		return service.getPostList(isList(req));
	}

	@GetMapping("/{id}")
	public Posts getPost(HttpServletRequest req, @PathVariable int id) {
		isList(req);
		return service.getPost(id, isList(req));
	}

	@PostMapping("")
	public Posts addPost(HttpServletRequest req, @Validated(PostsDTO.OnCreate.class) @RequestBody PostsDTO post) {
		return service.addPost(post, isList(req));
	}

	@PutMapping("/{id}")
	public Posts editPost(HttpServletRequest req, @PathVariable int id,
		@Validated(PostsDTO.OnUpdate.class) @RequestBody PostsDTO post) {
		if (id == 0L)
			throw new IllegalArgumentException("게시글 id는 0보다 커야합니다!");
		post.setId(id);
		return service.editPost(post, isList(req));
	}

	@DeleteMapping("/{id}")
	public Integer removePost(HttpServletRequest req, @PathVariable Integer id) {
		return service.removePost(id, isList(req));
	}

	private boolean isList(HttpServletRequest req) {
		return req.getRequestURI().contains("/list");
	}
}
