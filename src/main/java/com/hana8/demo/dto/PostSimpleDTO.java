package com.hana8.demo.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class PostSimpleDTO {
	private Long id;
	private String title;
	private LocalDateTime createdAt;
}
