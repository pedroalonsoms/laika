CREATE DATABASE app;

USE app;

-- BASE TABLES
CREATE TABLE entities (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    --Can be a vet or a person
    type VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,

    PRIMARY_KEY(id)
);

CREATE TABLE animals (
    birth_date TIMESTAMP NOT NULL,
    type VARCHAR(100) NOT NULL,
    sex VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL,
    particular_signs TEXT NOT NULL,
);

CREATE TABLE photos (
    url TEXT NOT NULL,
    ANIMAL,
)

--TABLES FOR LOOKUPS
CREATE TABLE adoptions (
    ANIMAL,
    adopted_by INT NOT NULL,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    end_date TIMESTAMP DEFAULT NULL,

    FOREIGN KEY(adopted_by) REFERENCES entities(id) ON DELETE CASCADE
);

CREATE TABLE rescues {
    ANIMAL,
    rescued_by INT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,

    FOREIGN KEY(rescued_by) REFERENCES entities(id) ON DELETE CASCADE
}