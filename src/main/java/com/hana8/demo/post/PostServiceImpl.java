package com.hana8.demo.post;

import java.util.List;

import com.hana8.demo.dto.Post;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
// @Service
// @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class PostServiceImpl implements PostService {
	private final PostRepository repository;
	private final PostRepository repositoryList;

	// private boolean isList;

	@Override
	public List<Post> getPostList(boolean isList) {
		return isList ? repositoryList.findAllPosts() : repository.findAllPosts();
	}

	@Override
	public Post getPost(int id, boolean isList) {
		return isList ? repositoryList.findPost(id) : repository.findPost(id);
	}

	@Override
	public Post addPost(PostAddDTO post, boolean isList) {
		return isList ? repositoryList.addPost(post) : repository.addPost(post);
	}

	@Override
	public Post editPost(PostEditDTO post, boolean isList) {
		return isList ? repositoryList.updatePost(post) : repository.updatePost(post);
	}

	@Override
	public int removePost(int id, boolean isList) {
		return isList ? repositoryList.deletePost(id) : repository.deletePost(id);
	}
}
