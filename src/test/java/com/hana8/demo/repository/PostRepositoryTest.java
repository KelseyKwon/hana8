package com.hana8.demo.repository;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.core.annotation.Order;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;

import com.hana8.demo.entity.Post;

@ActiveProfiles("test")
@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
class PostRepositoryTest {

	private static long id;
	private final Post newPost = Post.builder().title("test").body("").writer("kelsey").build();
	@Autowired
	private PostRepository postRepository;

	@Test
	@Order(1)
	void writeTest() {
		Post savedPost = postRepository.save(newPost);

		assertThat(savedPost.getId()).isEqualTo(newPost.getId());
		assertThat(savedPost).usingRecursiveComparison()
			.ignoringFields("id", "createdAt", "updatedAt")
			.isEqualTo(newPost);
		id = savedPost.getId();
	}

	@Test
	@Order(2)
	void readTest() {
		Post foundPost = postRepository.findById(this.id).orElseThrow();
		assertThat(foundPost).usingRecursiveComparison()
			.ignoringFields("id", "createdAt", "updatedAt")
			.isEqualTo(newPost);
	}

	@Test
	@Order(3)
	void updateTest() {
		Post post = postRepository.findById(id).orElseThrow();
		post.setTitle(post.getTitle() + "xxx");
		Post updatedPost = postRepository.save(post);
		assertThat(post.getTitle()).isEqualTo(updatedPost.getTitle());
	}

	@Test
	@Order(4)
	void deleteTest() {
		postRepository.deleteById(id);
		assertThat(postRepository.count()).isEqualTo(0);
	}

}
