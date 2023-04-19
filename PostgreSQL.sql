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

CREATE SEQUENCE IF NOT EXISTS user_details_id_seq;
CREATE SEQUENCE IF NOT EXISTS user_id_seq;
CREATE SEQUENCE IF NOT EXISTS paper_info_id_seq;
CREATE SEQUENCE IF NOT EXISTS file_id_seq;
CREATE SEQUENCE IF NOT EXISTS paper_id_seq;
CREATE SEQUENCE IF NOT EXISTS reviewer_id_seq;
CREATE SEQUENCE IF NOT EXISTS bid_id_seq;
CREATE SEQUENCE IF NOT EXISTS review_id_seq;


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
    file_data OID,
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
  CONSTRAINT "fk_blacklist_paper" FOREIGN KEY (paperID) REFERENCES paper (paperID)
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
CONSTRAINT "fk_bid_idxx" FOREIGN KEY (bidID) REFERENCES bid (bidID)
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
(10, 'Zeta', 'Nani ', 'Zeta@gmail.com',160, 45);

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
(10, 'author1', '$2a$10$nyOXTmKmmD8YczBtBIONDOokPTRC83ZoJRQtjIu5g4yq/QGvTIVQu', 'AUTHOR', 1, 10);

INSERT INTO reviewer (reviewerID, is_active, user_id)
VALUES
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(8, 1, 8);

-- INSERT INTO file VALUES
--   (1, io_import('/Desktop/Edy_kelvianto_Resume.pdf'), 'application/pdf'),
--   (2, io_import('/Desktop/a'), 'application/pdf');


-- INSERT INTO paper_info VALUES
-- (1, "My Paper 1", "Edy_kelvianto_Resume.pdf", now(), 2),
-- (2, "My Paper 1", "a.pdf", now(), 2);


-- INSERT INTO paper VALUES
-- (1, 1 , "Pending", 1, 0),
-- (2, 2 , "Pending", 2, 0);

