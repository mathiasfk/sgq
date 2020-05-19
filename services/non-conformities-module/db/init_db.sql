-- DROP DATABASE IF EXISTS non_conformities_db;
CREATE DATABASE IF NOT EXISTS non_conformities_db;
USE non_conformities_db;

CREATE USER IF NOT EXISTS 'sgq'@'%' IDENTIFIED WITH mysql_native_password BY 'super-secure-password';
GRANT USAGE, SELECT, INSERT, UPDATE, DELETE ON *.* TO 'sgq'@'%';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS non_conformity_type (
    id INT NOT NULL AUTO_INCREMENT, 
    non_conformity_name VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS non_conformity (
    id INT NOT NULL AUTO_INCREMENT, 
    non_conformity_type INT,
    non_conformity_time TIMESTAMP,
    item_id CHAR(50),
    comments VARCHAR(255),
    PRIMARY KEY (id),
    CONSTRAINT FOREIGN KEY (non_conformity_type)
        REFERENCES non_conformity_type(id)
        ON DELETE CASCADE
);