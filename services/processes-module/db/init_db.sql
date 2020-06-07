DROP DATABASE IF EXISTS processes_db;
CREATE DATABASE IF NOT EXISTS processes_db;
USE processes_db;

CREATE USER IF NOT EXISTS 'sgq'@'%' IDENTIFIED WITH mysql_native_password BY 'super-secure-password';
GRANT USAGE, SELECT, INSERT, UPDATE, DELETE ON *.* TO 'sgq'@'%';
FLUSH PRIVILEGES;


CREATE TABLE IF NOT EXISTS checklist_item (
    id INT NOT NULL AUTO_INCREMENT,
    category VARCHAR(255),
    name VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB 
CHARACTER SET latin1 COLLATE latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS checklist_answer (
    id INT NOT NULL AUTO_INCREMENT, 
    category VARCHAR(255),
    answer_time TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB
CHARACTER SET latin1 COLLATE latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS checklist_answer_item (
    id INT NOT NULL AUTO_INCREMENT, 
    answer_id INT,
    item_id INT,
    answer BOOLEAN,
    PRIMARY KEY (id),
    CONSTRAINT FOREIGN KEY (answer_id)
        REFERENCES checklist_answer(id)
        ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (item_id)
        REFERENCES checklist_item(id)
        ON DELETE CASCADE
) ENGINE=InnoDB
CHARACTER SET latin1 COLLATE latin1_swedish_ci;

REPLACE INTO checklist_item (category, name) values 
("Carroceria", "Integridade estrutural"), 
("Carroceria", "Peso"), 
("Carroceria", "Solda");

REPLACE INTO checklist_item (category, name) values 
("Pintura", "Inspeção visual"), 
("Pintura", "Blabla"),
("Pintura", "Espectrometria");

REPLACE INTO checklist_item (category, name) values 
("Motor", "Integridade estrutural"), 
("Motor", "Peso"), 
("Motor", "Funcionamento");

