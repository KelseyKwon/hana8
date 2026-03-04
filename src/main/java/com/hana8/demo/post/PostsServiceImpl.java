package com.hana8.demo.post;

import java.util.List;

import com.hana8.demo.dto.Posts;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
// @Service
// @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class PostsServiceImpl implements PostsService {
	private final PostsRepository repository;
	private final PostsRepository repositoryList;

	// private boolean isList;

	@Override
	public List<Posts> getPostList(boolean isList) {
		return isList ? repositoryList.findAllPosts() : repository.findAllPosts();
	}

	@Override
	public Posts getPost(int id, boolean isList) {
		return isList ? repositoryList.findPost(id) : repository.findPost(id);
	}

	@Override
	public Posts addPost(PostsDTO post, boolean isList) {
		return isList ? repositoryList.addPost(post) : repository.addPost(post);
	}

	@Override
	public Posts editPost(PostsDTO post, boolean isList) {
		return isList ? repositoryList.updatePost(post) : repository.updatePost(post);
	}

	@Override
	public int removePost(int id, boolean isList) {
		return isList ? repositoryList.deletePost(id) : repository.deletePost(id);
	}
}
