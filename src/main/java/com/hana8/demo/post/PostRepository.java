package com.hana8.demo.post;

import java.util.List;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;

import com.hana8.demo.dto.Post;

@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
@Repository
public interface PostRepository {
	List<Post> findAllPosts();

	Post findPost(int id);

	Post addPost(PostAddDTO post);

	Post updatePost(PostEditDTO post);

	int deletePost(int id);
}
