CREATE DATABASE db_link_u;
USE db_link_u;

/*-----------------------users-------------------------*/
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
/*-----------------------------------------------------*/

/*-----------------------categories-------------------------*/
CREATE TABLE categories(
    id INT(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    user_id INT(10),
    CONSTRAINT fk_user_cat FOREIGN KEY (user_id) REFERENCES users(id)
);
ALTER TABLE categories
    ADD PRIMARY KEY (id);
ALTER TABLE categories
    MODIFY id INT(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
/*----------------------------------------------------------*/

/*-----------------------link-------------------------*/
CREATE TABLE links(
    id INT(10) NOT NULL,
    url VARCHAR(200) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(200),
    user_id INT(10),
    category_id INT(10),
    create_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);
ALTER TABLE links
    ADD PRIMARY KEY (id);
ALTER TABLE links
    MODIFY id INT(10) NOT NULL AUTO AUTO_INCREMENT, AUTO_INCREMENT = 1;
/*----------------------------------------------------*/
