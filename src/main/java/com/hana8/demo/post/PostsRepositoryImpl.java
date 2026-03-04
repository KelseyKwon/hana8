package com.hana8.demo.post;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Primary;

import com.hana8.demo.dto.Posts;

// @Repository
@Primary
public class PostsRepositoryImpl implements PostsRepository {
	private final Map<Integer, Posts> posts = new HashMap<>();

	@Override
	public List<Posts> findAllPosts() {
		return posts.values().stream().toList();
	}

	@Override
	public Posts findPost(int id) {
		return this.posts.get(id);
	}

	@Override
	public Posts addPost(PostsDTO post) {
		int id = posts.keySet().stream().max(Integer::compareTo).orElse(0) + 1;
		Posts newer = Posts.builder().id(id).title(post.getTitle()).content(post.getBody()).build();
		posts.put(id, newer);
		return newer;
	}

	@Override
	public Posts updatePost(PostsDTO post) {
		Posts oldPosts = posts.get(post.getId());
		oldPosts.setTitle(post.getTitle());
		oldPosts.setContent(post.getBody());

		return oldPosts;
	}

	@Override
	public int deletePost(int id) {
		if (!posts.containsKey(id))
			return 0;
		posts.remove(id);
		return 1;
	}

}
