package com.hana8.demo.post;

import java.util.ArrayList;
import java.util.List;

import com.hana8.demo.dto.Posts;

public class PostsRepositoryListImpl implements PostsRepository {
	List<Posts> posts = new ArrayList<>();

	@Override
	public List<Posts> findAllPosts() {
		return posts;
	}

	@Override
	public Posts findPost(int id) {
		return posts.stream().filter(post -> post.getId() == id).findFirst().orElse(null);
	}

	@Override
	public Posts addPost(PostsDTO post) {
		int id = posts.stream().mapToInt(Posts::getId).max().orElse(0) + 1;
		Posts newer = Posts.builder().id(id).title(post.getTitle()).content(post.getBody()).build();
		posts.add(id, newer);
		return newer;
	}

	@Override
	public Posts updatePost(PostsDTO post) {
		Posts oldPosts = findPost(post.getId());
		if (oldPosts == null)
			return null;

		oldPosts.setTitle(post.getTitle());
		oldPosts.setContent(post.getBody());

		return oldPosts;
	}

	@Override
	public int deletePost(int id) {
		Posts oldPosts = findPost(id);
		if (oldPosts == null)
			return 0;

		posts.remove(oldPosts);
		return 1;
	}

}
