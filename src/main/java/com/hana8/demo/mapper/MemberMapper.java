package com.hana8.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.hana8.demo.dto.MemberDTO;
import com.hana8.demo.entity.Member;

@Mapper(componentModel = "spring", uses = {PostMapper.class})
public interface MemberMapper {
	// @Mapping(source = "nickname", target = "username")
	@Mapping(target = "password", ignore = true)
	@Mapping(target = "posts", source = "posts")
	@Mapping(target = "replyCount", expression = "java(member.getReplies() != null ? member.getReplies().size() : 0)")
	MemberDTO toDTO(Member member);

	@Mapping(target = "posts", ignore = true)
	Member toEntity(MemberDTO dto);
}
