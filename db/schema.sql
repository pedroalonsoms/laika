CREATE DATABASE app;

USE app;

CREATE TABLE animals (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    alias VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    sex VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL,
    particular_signs TEXT NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE photos (
    animal_id INT NOT NULL,
    url VARCHAR(200) NOT NULL,

    PRIMARY KEY(animal_id, url),
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
);