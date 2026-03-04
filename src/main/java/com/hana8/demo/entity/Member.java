package com.hana8.demo.entity;

import org.hibernate.annotations.ColumnDefault;

import com.hana8.demo.common.enums.BloodType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@Table(name = "Member", uniqueConstraints = {
	@UniqueConstraint(
		name = "unique_Member_email",
		columnNames = {"email"}
	)
})
public class Member extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "int unsigned")
	private Long id;

	@Column(nullable = false, length = 30)
	private String nickname;

	@Column(nullable = false, unique = true, length = 255)
	private String email;

	@Column(nullable = false, length = 128)
	private String password;

	@ColumnDefault("false")
	private boolean isActive;

	@Enumerated(EnumType.STRING)
	private BloodType bloodType;
}
