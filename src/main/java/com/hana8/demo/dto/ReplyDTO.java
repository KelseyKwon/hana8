package com.hana8.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReplyDTO {
	private Long id;

	private String reply;
	private Long replierId;

	private Long postId;

	// @JsonBackReference
	// private PostDTO post;

	public interface OnUpdate {
	}

	public interface OnCreate {
	}
}
