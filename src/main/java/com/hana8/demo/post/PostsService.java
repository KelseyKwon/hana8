package com.hana8.demo.post;

import java.util.List;

import com.hana8.demo.dto.Posts;

public interface PostsService {
	List<Posts> getPostList(boolean isList);

	Posts getPost(int id, boolean isList);

	Posts addPost(PostsDTO post, boolean isList);

	Posts editPost(PostsDTO post, boolean isList);

	int removePost(int id, boolean isList);

}
