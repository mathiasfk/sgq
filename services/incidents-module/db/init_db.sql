-- DROP DATABASE IF EXISTS incidents_db;
CREATE DATABASE IF NOT EXISTS incidents_db;
USE incidents_db;

CREATE USER IF NOT EXISTS 'sgq'@'%' IDENTIFIED WITH mysql_native_password BY 'super-secure-password';
GRANT USAGE, SELECT, INSERT, UPDATE, DELETE ON *.* TO 'sgq'@'%';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS incident_type (
    id INT NOT NULL AUTO_INCREMENT, 
    incident_name VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS incident (
    id INT NOT NULL AUTO_INCREMENT, 
    incident_type INT,
    incident_time TIMESTAMP,
    comments VARCHAR(255),
    PRIMARY KEY (id),
    CONSTRAINT FOREIGN KEY (incident_type)
        REFERENCES incident_type(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS incident_conseq_type (
    id INT NOT NULL AUTO_INCREMENT, 
    consequence_name VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS incident_conseq (
    id INT NOT NULL AUTO_INCREMENT, 
    incident_id INT,
    consequence_type INT,
    PRIMARY KEY (id),
    CONSTRAINT FOREIGN KEY (consequence_type)
        REFERENCES incident_conseq_type(id)
        ON DELETE CASCADE
);

REPLACE INTO incident_type (id, incident_name) values (1,"Parada agendada"), (2,"Falha de maquinario"), (3,"Erro humano");