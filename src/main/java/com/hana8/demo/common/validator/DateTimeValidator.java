package com.hana8.demo.common.validator;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class DateTimeValidator implements ConstraintValidator<DateTime, String> {
	private DateTimeFormatter formatter;
	private boolean isLocalDate = false;

	@Override
	public void initialize(DateTime annotation) {
		String fmt = annotation.value();
		this.isLocalDate = fmt.length() <= 10;
		this.formatter = DateTimeFormatter.ofPattern(fmt);
	}

	@Override
	public boolean isValid(String value, ConstraintValidatorContext ctx) {
		if (value == null || value.isBlank())
			return true;

		try {
			if (this.isLocalDate)
				LocalDate.parse(value, this.formatter);
			else
				LocalDateTime.parse(value, this.formatter);

			return true;
		} catch (DateTimeParseException e) {
			e.printStackTrace(System.out);
			log.info("DateTime parseError = {}", e.getMessage());
			return false;
		}
	}
}

/**
 *
 * private static final Pattern pattern = Pattern.compile("^(" +
 * 		"02\\d{7,8}|" +
 * 		"0[3-6][1-5]\\d{7,8}|" +
 * 		"01[016-9]\\d{7,8}|" +   // 휴대폰
 * 		"070\\d{7,8}|" +       // 인터넷 전화
 * 		"050\\d{8,9}|" +       // 안전번호
 * 		"0[78]0[02]\\d{7}|" +       // 수신자부담(080), 정보이용료(070)
 * 		"1[0-9]{3}\\d{4}" +      // 대표번호
 * 		")$"
 * 	);
 *
 *        @Override
 *    public boolean isValid(String value, ConstraintValidatorContext ctx) {
 * 		if (value == null || value.isBlank())
 * 			return true;
 * 		// 01012341234
 * 		String replaceSpaceAndHyphen = value.replaceAll("[\\s-]", "");
 * 		pattern.matcher(replaceSpaceAndHyphen).matches();
 *    }
 */
