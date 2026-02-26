package com.hana8.demo.post;

import java.util.List;

import com.hana8.demo.dto.Post;

public interface PostService {
	List<Post> getPostList(boolean isList);

	Post getPost(int id, boolean isList);

	Post addPost(PostAddDTO post, boolean isList);

	Post editPost(PostEditDTO post, boolean isList);

	int removePost(int id, boolean isList);

}
