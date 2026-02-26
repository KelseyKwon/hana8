package com.hana8.demo.post;

import java.util.ArrayList;
import java.util.List;

import com.hana8.demo.dto.Post;

public class PostRepositoryListImpl implements PostRepository {
	List<Post> posts = new ArrayList<>();

	@Override
	public List<Post> findAllPosts() {
		return posts;
	}

	@Override
	public Post findPost(int id) {
		return posts.stream().filter(post -> post.getId() == id).findFirst().orElse(null);
	}

	@Override
	public Post addPost(PostAddDTO post) {
		int id = posts.stream().mapToInt(Post::getId).max().orElse(0) + 1;
		Post newer = Post.builder().id(id).title(post.getTitle()).content(post.getContent()).build();
		posts.add(id, newer);
		return newer;
	}

	@Override
	public Post updatePost(PostEditDTO post) {
		Post oldPost = findPost(post.getId());
		if (oldPost == null)
			return null;

		oldPost.setTitle(post.getTitle());
		oldPost.setContent(post.getBody());

		return oldPost;
	}

	@Override
	public int deletePost(int id) {
		Post oldPost = findPost(id);
		if (oldPost == null)
			return 0;

		posts.remove(oldPost);
		return 1;
	}

}
