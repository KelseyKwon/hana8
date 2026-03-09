package com.hana8.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

import com.hana8.demo.post.PostsRepository;
import com.hana8.demo.post.PostsRepositoryImpl;
import com.hana8.demo.post.PostsRepositoryListImpl;
import com.hana8.demo.post.PostsService;
import com.hana8.demo.post.PostsServiceImpl;
import com.hana8.demo.service.HelpCallService;

@Configuration
@Lazy
@PropertySources({
	@PropertySource("classpath:db.properties"),
	@PropertySource("classpath:mail.properties")
})
public class SpringConfig {
	@Bean(initMethod = "initialize", destroyMethod = "destroy")
	public HelpCallService helpCallService() {
		return new HelpCallService();
	}

	@Bean
	public PostsRepository postsrepository() {
		return new PostsRepositoryImpl();
	}

	@Bean
	public PostsRepository postListRepository() {
		return new PostsRepositoryListImpl();
	}

	@Bean
	public PostsService postsService() {
		return new PostsServiceImpl(postsrepository(), postListRepository());
	}
}
