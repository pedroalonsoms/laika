CREATE DATABASE app;

USE app;

-- BASE TABLES
CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    type VARCHAR(100) NOT NULL,

    PRIMARY_KEY(fullname)
);

CREATE TABLE animals (
    id INT AUTO_INCREMENT NOT NULL,
    birth_date TIMESTAMP NOT NULL,
    type VARCHAR(100) NOT NULL,
    color VARCHAR(100) NOT NULL,
    sex VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL,
    particular_signs TEXT,
    found_at TEXT,

    PRIMARY_KEY(id)
);

--TABLES FOR LOOKUPS
CREATE TABLE photos (
    animal_id INT NOT NULL,
    url TEXT NOT NULL,

    FOREIGN KEY(animal_id) REFERENCES animal(id) ON DELETE CASCADE
);

CREATE TABLE adoptions (
    animal_id INT NOT NULL,
    adopted_by INT NOT NULL,
    source VARCHAR(100) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,

    FOREIGN KEY(animal_id) REFERENCES animal(id) ON DELETE CASCADE,
    FOREIGN KEY(adopted_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE rescues (
    animal_id INT NOT NULL,
    rescued_by INT NOT NULL,
    date TIMESTAMP NOT NULL,

    FOREIGN KEY(animal_id) REFERENCES animal(id) ON DELETE CASCADE,
    FOREIGN KEY(rescued_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE traits (
    animal_id INT NOT NULL,
    trait VARCHAR(100) NOT NULL,
    date TIMESTAMP NOT NULL,

    FOREIGN KEY(animal_id) REFERENCES animal(id) ON DELETE CASCADE,
    FOREIGN KEY(known_trait_id) REFERENCES known_traits(id) ON DELETE CASCADE
);