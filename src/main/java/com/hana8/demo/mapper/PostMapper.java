package com.hana8.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.hana8.demo.dto.PostBodyDTO;
import com.hana8.demo.dto.PostDTO;
import com.hana8.demo.dto.PostSimpleDTO;
import com.hana8.demo.entity.Post;
import com.hana8.demo.entity.PostBody;

@Mapper(componentModel = "spring")
public interface PostMapper {
	@Mapping(target = "replies", ignore = true)
	@Mapping(target = "writer", ignore = true)
	PostDTO toDTO(Post post);

	PostSimpleDTO toSimpleDTO(Post post);

	// @Mapping(target = "password", ignore = true)
	// MemberDTO toMemberDTO(Member member);

	@Mapping(target = "body", ignore = true)
	@Mapping(target = "replies", ignore = true)
	Post toEntity(PostDTO dto);

	@Mapping(target = "post", ignore = true)
	PostBody toEntity(PostBodyDTO dto);

	// @Mapping(target = "postId", source = "post.id")
	// ReplyDTO toDTO(Reply reply);
}
