package com.hana8.demo.common.validator;

import jakarta.validation.Payload;

public @interface CardNo {
	String message() default "유효하지 않은 카드번호 형식입니다.";

	// 이하 Jakarta Bean Validation 필수 필드들
	// 시점 (Reqeust Method가 POST: OnCreate.class, PUT: OnUpdate.class)
	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
