package com.hana8.demo.post;

import java.util.List;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;

import com.hana8.demo.dto.Posts;

@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
@Repository
public interface PostsRepository {
	List<Posts> findAllPosts();

	Posts findPost(int id);

	Posts addPost(PostsDTO post);

	Posts updatePost(PostsDTO post);

	int deletePost(int id);
}
