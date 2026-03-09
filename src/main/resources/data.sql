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
       ('hong', 'hong@gmail.com', 'hong', 'A', 1);

insert into Post(title, writer)
values ('Title1', 1);
insert into PostBody(post, body)
values (last_insert_id(), concat('This is a test post', last_insert_id()));
insert into Post(title, writer)
values ('Title2', 2);
insert into PostBody(post, body)
values (last_insert_id(), concat('This is a test post', last_insert_id()));
insert into Post(title, writer)
values ('Title3', 3);
insert into PostBody(post, body)
values (last_insert_id(), concat('This is a test post', last_insert_id()));

insert into Reply(reply, replier, post)
values ('rrrr1-1', 1, 1);
insert into Reply(reply, replier, post)
values ('rrrr1-2', 1, 1);
