drop database if exists `research`;

create database `research`;

use `research`;


drop table if exists `user_details`;

create table `user_details` (
    `id` int(11) not null auto_increment primary key,
    `first_name` varchar(50) ,
    `last_name` varchar(50),
    `height` int(11),
    `weight` int(11) 
)ENGINE=InnoDB auto_increment=1 default charset=latin1;

drop table if exists `roles`;

create table `roles` (
    `roles` varchar(50) not null primary key,
    `Description` varchar(50)
)ENGINE=InnoDB auto_increment=1 default charset=latin1;


drop table if exists `user`;

create table `user` (
    `id` int(11) not null auto_increment primary key,
    `username` varchar(50),
    `password` varchar(100),
    `roles` varchar(50),
    `active` tinyint(1) default 1,
    `user_id` int (11),
    constraint `fk_userid` foreign key (`user_id`)
    references `user_details` (`id`),
    constraint `fk_role` foreign key (`roles`)
    references `roles` (`roles`)
)ENGINE=InnoDB auto_increment=1 default charset=latin1;

insert into `roles` values
("ADMIN", "Admin desc"),
("Reviewer", "Reviewer desc"),
("Author", "Author desc"),
("Conference", "Conference desc");



insert into `user_details` values
(1, "Lim", "Yang", 177, 72),
(2, "Reine", "Pavolia", 175, 50),
(3, "Ollie", "Kureiji", 165, 48),
(4, "Anya", "Melfissa", 148, 45);

insert into `user` values

(1, "admin", "$2a$10$pEwyHagJ6fbpNwAuIU4kXOYQnPT90YO7zWenR5y0DeJ1haVRftnRS", "ADMIN", 1,1),
(2, "author", "$2a$10$pEwyHagJ6fbpNwAuIU4kXOYQnPT90YO7zWenR5y0DeJ1haVRftnRS", "AUTHOR", 1,2),
(3, "reviewer", "$2a$10$nyOXTmKmmD8YczBtBIONDOokPTRC83ZoJRQtjIu5g4yq/QGvTIVQu", "REVIEWER", 1,3),
(4, "conference", "$2a$10$nyOXTmKmmD8YczBtBIONDOokPTRC83ZoJRQtjIu5g4yq/QGvTIVQu", "CONFERENCE", 1,4);





