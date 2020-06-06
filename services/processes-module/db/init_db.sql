DROP DATABASE IF EXISTS processes_db;
CREATE DATABASE IF NOT EXISTS processes_db;
USE processes_db;

CREATE USER IF NOT EXISTS 'sgq'@'%' IDENTIFIED WITH mysql_native_password BY 'super-secure-password';
GRANT USAGE, SELECT, INSERT, UPDATE, DELETE ON *.* TO 'sgq'@'%';
FLUSH PRIVILEGES;


CREATE TABLE IF NOT EXISTS checklist_item (
    id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB ;

CREATE TABLE IF NOT EXISTS checklist_answer (
    id INT NOT NULL AUTO_INCREMENT, 
    answer_time TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB ;

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
) ENGINE=InnoDB ;

REPLACE INTO checklist_item (id, name) values (1,"Carroceria"), (2,"Pintura"), (3,"Motor"), (4,"Manual de Instrução"), (5,"Extintor de Incêndio"),(6,"Macaco Hidraulico");

