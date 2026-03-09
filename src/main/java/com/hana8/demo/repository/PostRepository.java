package com.hana8.demo.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.hana8.demo.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long>, QuerydslPredicateExecutor<Post> {
	List<Post> findByTitleStartingWith(String title);

	List<Post> findByIdBetween(long l, long l1);

	@Query("select p from Post p where p.id between :start and :end order by p.id desc")
	List<Post> findByAny(@Param("start") int s, @Param("end") int e);

	@Query("select p.createdAt, p.title from Post p where p.id between :start and :end order by p.createdAt desc, p.title")
	List<Object[]> sortByCreatedAtAndTitle(@Param("start") int s, @Param("end") int e);

	List<Post> findAllByWriterId(long id);

	Page<Post> findAllByOrderByCreatedAtDesc(Pageable pageable);

	@Query("delete from Post where id = :id")
	@Modifying
	@Transactional
	int deletePost(@Param("id") Long id);
}
