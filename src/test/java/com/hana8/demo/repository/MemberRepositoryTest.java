package com.hana8.demo.repository;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.hana8.demo.common.enums.BloodType;
import com.hana8.demo.entity.Member;

class MemberRepositoryTest extends BaseRepositoryTest {

	private static long id;
	private static long orgCount = 0;

	private final Member newMember = Member.builder()
		.email("tester@mail.com")
		.nickname("tester")
		.bloodType(BloodType.O)
		.password("123456")
		.isActive(true)
		.build();

	@Autowired
	private MemberRepository repository;
	// private final MemberRepository repository;

	// MemberRepositoryTest(MemberRepository repository) {
	// 	this.repository = repository;
	// }

	@Test
	@Order(1)
	void writeTest() {
		System.out.println("m = " + newMember);

		Member savedMember = repository.save(newMember);
		System.out.println("savedMember = " + savedMember);

		assertThat(savedMember.getNickname()).isEqualTo(newMember.getNickname());
		assertThat(savedMember).usingRecursiveComparison()
			.ignoringFields("id", "createdAt", "updatedAt")
			.isEqualTo(newMember);

		Member findMember = repository.findById(savedMember.getId()).orElseThrow();
		assertThat(savedMember).isEqualTo(findMember);

		id = savedMember.getId();
	}

	@Test
	@Order(2)
	void readTest() {
		List<Member> all = repository.findAll();
		System.out.println("all = " + all);
		long cnt = repository.count();
		System.out.println("repository.count() = " + cnt);
		assertThat(cnt).isEqualTo(all.size());

		Member m = all.get((int)(cnt - 1));
		assertThat(m).usingRecursiveComparison().ignoringFields("id", "createdAt", "updatedAt").isEqualTo(newMember);
	}

	@Order(3)
	void updateTest() {
		Member member = repository.findById(id).orElseThrow();
		member.setNickname(member.getNickname() + "xxx");
		repository.save(member);
	}

	@Test
	@Order(4)
	void deleteTest() {
		repository.deleteById(this.id);
	}

	@Test
	@Order(5)
	void finalCheck() {
		assertThat(repository.count()).isEqualTo(0);
	}
}
