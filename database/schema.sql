CREATE DATABASE app;

USE app;

-- BASE TABLES
CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    -- Laika or General Society
    organization VARCHAR(100) NOT NULL,

    PRIMARY KEY(fullname)
);

CREATE TABLE animals (
    id INT AUTO_INCREMENT NOT NULL,
    found_age TIMESTAMP NOT NULL,
    found_date TIMESTAMP NOT NULL,
    found_address TEXT,
    type VARCHAR(100) NOT NULL,
    color VARCHAR(100) NOT NULL,
    sex VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL,
    particular_signs TEXT,

    PRIMARY KEY(id)
);

CREATE TABLE photos (
    animal_id INT NOT NULL,
    url TEXT NOT NULL,

    PRIMARY KEY(animal_id, url),
    FOREIGN KEY(animal_id) REFERENCES animal(id) ON DELETE CASCADE
);

CREATE TABLE traits (
    animal_id INT NOT NULL,
    trait VARCHAR(100) NOT NULL,
    date TIMESTAMP NOT NULL,

    FOREIGN KEY(animal_id) REFERENCES animal(id) ON DELETE CASCADE,
);

CREATE TABLE appointments (
    animal_id INT NOT NULL,
    date TIMESTAMP NOT NULL,
    notes TEXT NOT NULL,

    FOREIGN KEY(animal_id) REFERENCES animal(id) ON DELETE CASCADE
);

CREATE TABLE adoptions (
    id INT AUTO_INCREMENT NOT NULL,
    source VARCHAR(100) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,

    PRIMARY KEY(id),
);

--TABLES FOR LOOKUPS

CREATE TABLE rescues (
    animal_id INT NOT NULL,
    rescued_by INT NOT NULL,

    PRIMARY KEY(animal_id, rescued_by),
    FOREIGN KEY(animal_id) REFERENCES animal(id) ON DELETE CASCADE,
    FOREIGN KEY(rescued_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE adopts (
    adoption_id INT NOT NULL,
    adopted_by INT NOT NULL,

    PRIMARY KEY(adoption_id, adopted_by),
    FOREIGN KEY(adoption_id) REFERENCES adoptions(id) ON DELETE CASCADE,
    FOREIGN KEY(adopted_by) REFERENCES users(id) ON DELETE CASCADE
);