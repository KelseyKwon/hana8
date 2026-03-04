SET FOREIGN_KEY_CHECKS = 0;
truncate table User;
truncate table Member;
SET FOREIGN_KEY_CHECKS = 1;

SET time_zone = 'Asia/Seoul';


insert into User(email, telno, username, bloodType)
values ('hong@email.com', '01012345678', 'hong', 'A');

insert into User(email, telno, username, bloodType)
values ('kim@email.com', '01012345687', 'kim', 'B');

insert into Member(nickname, email, password, bloodType, isActive)
values ('kelsey', 'kelsey@gmail.com', 'kelsey1234', 'O', 1),
       ('kim', 'kim@gmail.com', 'kim', 'B', 1),
       ('hong', 'hong@gmail.com', 'hong', 'A', 1)
