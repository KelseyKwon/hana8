package com.hana8.demo.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.hana8.demo.dto.ReplyDTO;
import com.hana8.demo.entity.Reply;

@Mapper(componentModel = "spring")
public interface ReplyMapper {
	@Mapping(target = "postId", source = "post.id")
	// target      source
	@Mapping(target = "replierId", source = "replier.id")
	ReplyDTO toDTO(Reply reply);

	@Mapping(source = "postId", target = "post.id")
	@Mapping(source = "replierId", target = "replier.id")
	Reply toEntity(ReplyDTO dto);

	List<ReplyDTO> toDTOList(List<Reply> replies);
}
