alter table User
    add column bloodType enum ('A','AB','B','O');

CREATE TABLE `Member`
(
    `id`        int unsigned NOT NULL AUTO_INCREMENT,
    `isActive`  bit(1)       NOT NULL   DEFAULT b'0',
    `createdAt` timestamp    NOT NULL   DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` timestamp    NOT NULL   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `nickname`  varchar(30)  NOT NULL,
    `password`  varchar(128) NOT NULL,
    `email`     varchar(255) NOT NULL,
    `bloodType` enum ('A','AB','B','O') DEFAULT NULL,
    PRIMARY KEY (`id`)
);

alter table Member
    add constraint unique_Member_email unique (email);


create table Post
(
    id        varchar(255)                        not null
        primary key,
    createdAt timestamp default CURRENT_TIMESTAMP not null,
    updatedAt timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    title     varchar(255)                        null
);
