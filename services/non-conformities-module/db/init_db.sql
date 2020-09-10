CREATE DATABASE IF NOT EXISTS non_conformities_db;
USE non_conformities_db;

CREATE USER IF NOT EXISTS 'sgq'@'%' IDENTIFIED WITH mysql_native_password BY 'super-secure-password';
GRANT USAGE, SELECT, INSERT, UPDATE, DELETE ON *.* TO 'sgq'@'%';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS non_conformity (
    id INT NOT NULL AUTO_INCREMENT, 
    non_conformity_name VARCHAR(255),
    non_conformity_time TIMESTAMP,
    comments VARCHAR(255),
    `resource` varchar(255), /* Qual insumo ao qual a não conformidade se refere */
    PRIMARY KEY (id)
);

/* Consequencias operacionais, pode haver mais de uma para cada não conformidade cadastrada */
CREATE TABLE IF NOT EXISTS non_conformity_consequences (
    id INT NOT NULL AUTO_INCREMENT, 
    non_conformity_id int not null,
    consequence_description text not null,
    PRIMARY KEY (id),
    CONSTRAINT FOREIGN KEY (non_conformity_id)
        REFERENCES non_conformity(id)
        ON DELETE CASCADE
);