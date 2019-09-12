CREATE DATABASE db_link_u;
USE db_link_u;

CREATE TABLE users(
    id INT(10) NOT NULL,
    fname VARCHAR(100) NOT NULL,
    lname VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    create_at timestamp NOT NULL DEFAULT current_timestamp
);
ALTER TABLE users
    ADD PRIMARY KEY (id);
ALTER TABLE users
    MODIFY id INT(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE links(
    id INT(10) NOT NULL,
    url VARCHAR(100) NOT NULL,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(100),
    user_id INT(10),
    create_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);
ALTER TABLE links
    ADD PRIMARY KEY (id);
ALTER TABLE links
    MODIFY id INT(10) NOT NULL AUTO AUTO_INCREMENT, AUTO_INCREMENT = 1;