package com.hana8.demo.post;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Primary;

import com.hana8.demo.dto.Post;

// @Repository
@Primary
public class PostRepositoryImpl implements PostRepository {
	private final Map<Integer, Post> posts = new HashMap<>();

	@Override
	public List<Post> findAllPosts() {
		return posts.values().stream().toList();
	}

	@Override
	public Post findPost(int id) {
		return this.posts.get(id);
	}

	@Override
	public Post addPost(PostAddDTO post) {
		int id = posts.keySet().stream().max(Integer::compareTo).orElse(0) + 1;
		Post newer = Post.builder().id(id).title(post.getTitle()).content(post.getContent()).build();
		posts.put(id, newer);
		return newer;
	}

	@Override
	public Post updatePost(PostEditDTO post) {
		Post oldPost = posts.get(post.getId());
		oldPost.setTitle(post.getTitle());
		oldPost.setContent(post.getBody());

		return oldPost;
	}

	@Override
	public int deletePost(int id) {
		if (!posts.containsKey(id))
			return 0;
		posts.remove(id);
		return 1;
	}

}
