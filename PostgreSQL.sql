DROP TABLE IF EXISTS user_details CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS paper_info CASCADE;
DROP TABLE IF EXISTS "file" CASCADE;
DROP TABLE IF EXISTS paper CASCADE;
DROP TABLE IF EXISTS reviewer CASCADE;
DROP TABLE IF EXISTS "blacklist_paper" CASCADE;
DROP TABLE IF EXISTS "bid" CASCADE;
DROP TABLE IF EXISTS "review" CASCADE;

CREATE SEQUENCE IF NOT EXISTS user_details_id_seq START 1;
CREATE SEQUENCE IF NOT EXISTS user_id_seq START 1;
CREATE SEQUENCE IF NOT EXISTS paper_info_id_seq START 1;
CREATE SEQUENCE IF NOT EXISTS file_id_seq START 1;
CREATE SEQUENCE IF NOT EXISTS paper_id_seq START 1;
CREATE SEQUENCE IF NOT EXISTS reviewer_id_seq START 1;
CREATE SEQUENCE IF NOT EXISTS bid_id_seq START 1;
CREATE SEQUENCE IF NOT EXISTS review_id_seq START 1;


CREATE TABLE user_details (
    id INTEGER PRIMARY KEY DEFAULT nextval('user_details_id_seq'),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email varchar(200),
    height INT,
    weight INT
);


CREATE TABLE roles (
    roles VARCHAR(50) PRIMARY KEY,
    Description VARCHAR(50)
);

CREATE TABLE "user" (
    id INTEGER PRIMARY KEY DEFAULT nextval('user_id_seq'),
    username VARCHAR(50),
    password VARCHAR(100),
    roles VARCHAR(50),
    active SMALLINT DEFAULT 1,
    user_id INT,
    CONSTRAINT fk_userid FOREIGN KEY (user_id) REFERENCES user_details(id),
    CONSTRAINT fk_role FOREIGN KEY (roles) REFERENCES roles(roles)
);


CREATE TABLE paper_info (
    paperID INTEGER PRIMARY KEY DEFAULT nextval('paper_info_id_seq'),
    title VARCHAR(50),
    filename VARCHAR(50),
    upload DATE,
    authorID INT,
    description VARCHAR(50),
    CONSTRAINT fk_authorID FOREIGN KEY (authorID) REFERENCES "user" (id)
);


CREATE TABLE "file" (
    fileID  INTEGER PRIMARY KEY DEFAULT nextval('file_id_seq'),
    file_data_id Varchar(50),
    file_type VARCHAR(50)
);

CREATE TABLE paper (
    paperID INTEGER PRIMARY KEY DEFAULT nextval('paper_id_seq'),
    file_info_ID INT,
    status VARCHAR(50),
    paper_info_ID INT,
    reviewed_time INT DEFAULT 0,
    CONSTRAINT fk_paperID FOREIGN KEY (paper_info_ID) REFERENCES paper_info (paperID),
    CONSTRAINT fk_fileID FOREIGN KEY (file_info_ID) REFERENCES "file" (fileID)
);

CREATE TABLE reviewer (
    reviewerID INTEGER PRIMARY KEY DEFAULT nextval('reviewer_id_seq'),
    is_active SMALLINT NOT NULL DEFAULT 1,
    user_id INT NOT NULL,
  CONSTRAINT fk_reviewer_idxx FOREIGN KEY (user_id) REFERENCES user_details(id)
);



CREATE TABLE "blacklist_paper" (
  reviewerID integer not null,
  paperID integer not null,
  CONSTRAINT "pk_blacklist_paper" PRIMARY KEY (reviewerID, paperID),
  CONSTRAINT "fk_blacklist_reviewer" FOREIGN KEY (reviewerID) REFERENCES reviewer (reviewerID),
  CONSTRAINT "fk_blacklist_paper" FOREIGN KEY (paperID) REFERENCES paper (paperID) ON DELETE CASCADE
);


CREATE TABLE "bid" (
    bidID INTEGER PRIMARY KEY DEFAULT nextval('bid_id_seq'),
    paperID INTEGER NOT NULL,
    reviewerID INTEGER NOT NULL,
    status varchar(50) default 'Pending',
    bid_date DATE,
CONSTRAINT "fk_reviewer_idx" FOREIGN KEY (reviewerID) REFERENCES reviewer (reviewerID),
CONSTRAINT "fk_paper_idx" FOREIGN KEY (paperID) REFERENCES paper (paperID)
);

CREATE TABLE "review" (
    reviewID INTEGER PRIMARY KEY DEFAULT nextval('review_id_seq'),
    bidID INTEGER,
    rate INTEGER,
    "comment" Varchar(50),
    review_date Date,
CONSTRAINT "fk_bid_idxx" FOREIGN KEY (bidID) REFERENCES bid (bidID) ON DELETE CASCADE
);


INSERT INTO roles (roles, Description)
VALUES
('ADMIN', 'Admin desc'),
('REVIEWER', 'Reviewer desc'),
('AUTHOR', 'Author desc'),
('CONFERENCE', 'Conference desc');

INSERT INTO user_details (id, first_name, last_name, email, height, weight)
VALUES
(1, 'Lim', 'Yang', 'yang@gmail.com', 177, 72),
(2, 'Reine', 'Pavolia', 'reine@gmail.com', 175, 50),
(3, 'Ollie', 'Kureiji', 'ollie@gmail.com', 165, 48),
(4, 'Anya', 'Melfissa', 'Anya@gmail.com', 148, 45),
(5, 'Moona', 'Hoshinova', 'Moona@gmail.com' ,177, 50),
(6, 'Ayunda', 'Risu', 'Risu@gmail.com', 150, 22),
(7, 'Airani', 'Iofi', 'iofi@gmail.com', 148, 40),
(8, 'Kobo', 'Kanaeru', 'kobo@gmail.com', 130, 45),
(9, 'Kaela', 'Kov', 'Kaela@gmail.com',180, 60),
(10, 'Zeta', 'Nani ', 'Zeta@gmail.com',160, 45),
(11, 'Dummy', 'Acount1 ', 'dummy1@gmail.com',160, 45),
(12, 'Dummy', 'Acount2 ', 'dummy2@gmail.com',160, 45),
(13, 'Dummy', 'Acount3 ', 'dummy3@gmail.com',160, 45),
(14, 'Dummy', 'Acount4 ', 'dummy4@gmail.com',160, 45),
(15, 'Dummy', 'Acount5 ', 'dummy5@gmail.com',160, 45);

INSERT INTO "user" (id, username, password, roles, active, user_id)
VALUES
(1, 'admin', '$2a$10$pEwyHagJ6fbpNwAuIU4kXOYQnPT90YO7zWenR5y0DeJ1haVRftnRS', 'ADMIN', 1, 1),
(2, 'author', '$2a$10$pEwyHagJ6fbpNwAuIU4kXOYQnPT90YO7zWenR5y0DeJ1haVRftnRS', 'AUTHOR', 1, 2),
(3, 'conference', '$2a$10$nyOXTmKmmD8YczBtBIONDOokPTRC83ZoJRQtjIu5g4yq/QGvTIVQu', 'CONFERENCE', 1, 3),
(4, 'reviewer', '$2a$10$nyOXTmKmmD8YczBtBIONDOokPTRC83ZoJRQtjIu5g4yq/QGvTIVQu', 'REVIEWER', 1, 4),
(5, 'reviewer1', '$2a$10$nyOXTmKmmD8YczBtBIONDOokPTRC83ZoJRQtjIu5g4yq/QGvTIVQu', 'REVIEWER', 1, 5),
(6, 'reviewer2', '$2a$10$nyOXTmKmmD8YczBtBIONDOokPTRC83ZoJRQtjIu5g4yq/QGvTIVQu', 'REVIEWER', 1, 6),
(7, 'reviewer3', '$2a$10$nyOXTmKmmD8YczBtBIONDOokPTRC83ZoJRQtjIu5g4yq/QGvTIVQu', 'REVIEWER', 1, 7),
(8, 'reviewer4', '$2a$10$nyOXTmKmmD8YczBtBIONDOokPTRC83ZoJRQtjIu5g4yq/QGvTIVQu', 'REVIEWER', 1, 8),
(9, 'admin1', '$2a$10$nyOXTmKmmD8YczBtBIONDOokPTRC83ZoJRQtjIu5g4yq/QGvTIVQu', 'ADMIN', 1, 9),
(10, 'author1', '$2a$10$nyOXTmKmmD8YczBtBIONDOokPTRC83ZoJRQtjIu5g4yq/QGvTIVQu', 'AUTHOR', 1, 10),
(11, 'reviewer5', '$2a$10$nyOXTmKmmD8YczBtBIONDOokPTRC83ZoJRQtjIu5g4yq/QGvTIVQu', 'REVIEWER', 1, 11),
(12, 'reviewer6', '$2a$10$nyOXTmKmmD8YczBtBIONDOokPTRC83ZoJRQtjIu5g4yq/QGvTIVQu', 'REVIEWER', 1, 12),
(13, 'reviewer7', '$2a$10$nyOXTmKmmD8YczBtBIONDOokPTRC83ZoJRQtjIu5g4yq/QGvTIVQu', 'REVIEWER', 1, 13),
(14, 'reviewer8', '$2a$10$nyOXTmKmmD8YczBtBIONDOokPTRC83ZoJRQtjIu5g4yq/QGvTIVQu', 'REVIEWER', 1, 14),
(15, 'reviewer9', '$2a$10$nyOXTmKmmD8YczBtBIONDOokPTRC83ZoJRQtjIu5g4yq/QGvTIVQu', 'REVIEWER', 1, 15);


INSERT INTO reviewer (reviewerID, is_active, user_id)
VALUES
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(8, 1, 8),
(9, 0 , 9),
(11, 1, 11),
(12, 1, 12),
(13, 1, 13),
(14, 1, 14),
(15, 1, 15);

INSERT INTO paper_info (paperID, title, filename, upload, authorID )
VALUES
(1, 'The adventure of my Assignment', 'SIM-A1-CSCI203-2021S3-v1-Question.pdf', '2023-01-23', 2 ),
(2, 'My Nightmare', 'SIM-A2-CSCI361-2022S3.pdf', '2023-03-23', 2 ),
(3, 'The Old Resume', 'Edy_kelvianto_Resume.pdf', '2023-04-23', 2 );


INSERT INTO "file" (fileID, file_data_id, file_type)
VALUES
(1, '1baj4lJk6QdCpXTaymjPM3wfxdiEAedDh', 'application/pdf' ),
(2, '1ON5eV0I3hwQe9M3-r3OJFB6ISV6ifz9l', 'application/pdf' ),
(3, '1YkSz44K2LGjNHCdkSdUihJoxKUCRCdRt', 'application/pdf' );


INSERT INTO paper (paperID, file_info_ID, status, paper_info_ID, reviewed_time )
VALUES
(1, 1, 'Accept', 1, 10),
(2, 2, 'Reject', 2, 8),
(3, 3, 'Ready', 3, 5);


INSERT INTO "bid" (bidID ,paperID, reviewerID, status, bid_date )
VALUES
(1, 1 ,4, 'Complete', '2023-01-23'),
(2, 1 ,5, 'Complete', '2023-01-23'),
(3, 1 ,6, 'Complete', '2023-01-23'),
(4, 1, 7, 'Complete', '2023-01-23'),
(5, 1, 8, 'Complete', '2023-01-23'),
(6, 1, 11, 'Complete', '2023-01-24'),
(7, 1, 12, 'Complete', '2023-01-24'),
(8, 1, 13, 'Complete', '2023-01-24'),
(9, 1, 14, 'Complete', '2023-01-24'),
(10, 1, 15, 'Complete', '2023-01-24'),

(11, 2 ,4, 'Complete', '2023-03-23'),
(12, 2 ,5, 'Complete', '2023-03-23'),
(13, 2 ,6, 'Complete', '2023-03-23'),
(14, 2, 7, 'Complete', '2023-03-23'),
(15, 2, 8, 'Complete', '2023-03-23'),
(16, 2, 11, 'Complete', '2023-03-24'),
(17, 2, 12, 'Complete', '2023-03-24'),
(18, 2, 13, 'Complete', '2023-03-24'),

(19, 3, 4, 'Accept', '2023-04-24'),
(20, 3, 5, 'Complete', '2023-04-24'),
(21, 3, 6, 'Complete', '2023-04-24'),
(22, 3, 7, 'Complete', '2023-04-24'),
(23, 3, 8, 'Complete', '2023-04-24'),
(24, 3, 15, 'Complete', '2023-04-24');




INSERT INTO "review" (reviewID ,bidID, rate, "comment" , review_date )
VALUES
(1, 1, 5, 'Comment Number 1', '2023-01-24'),
(2, 2, 5, 'Comment Number 2', '2023-01-24'),
(3, 3, 4, 'Comment Number 3', '2023-01-24'),
(4, 4, 5, 'Comment Number 4', '2023-01-24'),
(5, 5, 3, 'Comment Number 5', '2023-01-24'),
(6, 6, 5, 'Comment Number 6', '2023-01-25'),
(7, 7, 3, 'Comment Number 7', '2023-01-26'),
(8, 8, 4, 'Comment Number 8', '2023-01-27'),
(9, 9, 5, 'Comment Number 9', '2023-01-28'),
(10, 10, 4, 'Comment Number 10', '2023-01-25'),

(11, 11, 3, 'Comment Number 11', '2023-03-24'),
(12, 12, 2, 'Comment Number 12', '2023-03-24'),
(13, 13, 1, 'Comment Number 13', '2023-03-24'),
(14, 14, 5, 'Comment Number 14', '2023-03-24'),
(15, 15, 2, 'Comment Number 15', '2023-03-24'),
(16, 16, 1, 'Comment Number 16', '2023-03-25'),
(17, 17, 1, 'Comment Number 17', '2023-03-26'),
(18, 18, 2, 'Comment Number 18', '2023-03-27'),

(19, 20, 2, 'Comment Number 19', '2023-04-27'),
(20, 21, 2, 'Comment Number 20', '2023-04-27'),
(21, 22, 2, 'Comment Number 21', '2023-04-27'),
(22, 23, 2, 'Comment Number 22', '2023-04-27'),
(23, 24, 2, 'Comment Number 23', '2023-04-27');


-- INSERT INTO file VALUES
--   (1, io_import('/Desktop/Edy_kelvianto_Resume.pdf'), 'application/pdf'),
--   (2, io_import('/Desktop/a'), 'application/pdf');


-- INSERT INTO paper_info VALUES
-- (1, "My Paper 1", "Edy_kelvianto_Resume.pdf", now(), 2),
-- (2, "My Paper 1", "a.pdf", now(), 2);


-- INSERT INTO paper VALUES
-- (1, 1 , "Pending", 1, 0),
-- (2, 2 , "Pending", 2, 0);




-- SELECT setval('user_id_seq', (SELECT MAX(id) FROM "user"), true);
-- SELECT setval('user_details_id_seq', (SELECT MAX(id) FROM user_details), true);
-- SELECT setval('paper_id_seq', (SELECT MAX(paperID) FROM paper), true);
-- SELECT setval('paper_info_id_seq', (SELECT MAX(paperID) FROM paper_info), true);
-- SELECT setval('file_id_seq', (SELECT MAX(fileID) FROM "file"), true);
-- SELECT setval('reviewer_id_seq', (SELECT MAX(reviewerID) FROM reviewer), true);
-- SELECT setval('review_id_seq', (SELECT MAX(reviewID) FROM "review"), true);
-- SELECT setval('bid_id_seq', (SELECT MAX(bidID) FROM "bid"), true);
