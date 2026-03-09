package com.hana8.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostBodyDTO {
	private Long id;

	private String body;

	// @JsonBackReference
	// @ToString.Exclude
	// private PostDTO post;

}
