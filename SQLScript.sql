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
("REVIEWER", "Reviewer desc"),
("AUTHOR", "Author desc"),
("CONFERENCE", "Conference desc");



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

create table `paper_info` (
    `paperID` int(11) not null auto_increment primary key,
    `title` varchar(50) ,
    `filename` varchar(50),
    `upload` Date,
    `authorID` int(11),
    `description` varchar(50),
    constraint `fk_authorID` foreign key (`authorID`)
    references `user` (`id`)
)ENGINE=InnoDB auto_increment=1 default charset=latin1;

create table `file` (
    `fileID` int(11) not null auto_increment primary key,
    `file_data` blob ,
    `file_type` varchar(50)
)ENGINE=InnoDB auto_increment=1 default charset=latin1;


create table `paper` (
    `paperID` int(11) not null auto_increment primary key,
    `file_info_ID` int(11) ,
    `status` varchar(50),
    `paper_info_ID` int(11) ,
    `reviewed_time` int(11) default 0,
    constraint `fk_paperID` foreign key (`paper_info_ID`)
    references `paper_info` (`paperID`),
    constraint `fk_fileID`  foreign key (`file_info_ID`)
    references `file` (`fileID`)
    
)ENGINE=InnoDB auto_increment=1 default charset=latin1;

CREATE TABLE `reviewer` (
  `reviewerID` INT(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL default 1 ,
  `user_id` int(11) not null,
  PRIMARY KEY (`reviewerID`),
  CONSTRAINT `fk_reviewer_idxx` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into `reviewer` values
(3, 1, 3);

create table `blacklist_paper` (
    `reviewerID` int(11) not null,
    `paperID` int(11) not null,
    PRIMARY KEY (`reviewerID`, `paperID`),
    CONSTRAINT `fk_blacklist_reviewer` FOREIGN KEY (`reviewerID`) REFERENCES `reviewer` (`reviewerID`),
    CONSTRAINT `fk_blacklist_paper` FOREIGN KEY (`paperID`) REFERENCES `paper` (`paperID`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;




CREATE TABLE `bid` (
  `bidID` int(11) not null auto_increment primary key,
  `paperID` INT(11) NOT NULL,
  `reviewerID` INT(11) NOT NULL,
  `status` varchar(50) default "Pending",
  CONSTRAINT `fk_reviewer_idx` FOREIGN KEY (`reviewerID`) REFERENCES `reviewer` (`reviewerID`),
  CONSTRAINT `fk_paper_idx` FOREIGN KEY (`paperID`) REFERENCES `paper` (`paperID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


create table `review` (
    `reviewID` int(11) not null auto_increment primary key,
    `bidID` int(11),
    `rate` int(11),
    `comment` Varchar(50) ,
    `review_date` Date,
    CONSTRAINT `fk_bid_idxx` FOREIGN KEY (`bidID`) REFERENCES `bid` (`bidID`)
)ENGINE=InnoDB auto_increment=1 default charset=latin1;


