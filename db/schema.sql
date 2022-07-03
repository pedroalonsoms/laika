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

    PRIMARY KEY (id)
);

CREATE TABLE photos (
    animal_id INT NOT NULL,
    url VARCHAR(200) NOT NULL,

    PRIMARY KEY (animal_id, url),
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
);

CREATE TABLE events (
    animal_id INT NOT NULL,
    description VARCHAR(100) NOT NULL,
    date DATE NOT NULL,

    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
);

CREATE TABLE appointments (
    animal_id INT NOT NULL,
    date DATE NOT NULL,

    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
);

-- Crazy stuff
CREATE TABLE addresses (
    id INT AUTO_INCREMENT NOT NULL,
    municipality VARCHAR(100) NOT NULL,
    zip_code VARCHAR(5) NOT NULL,
    neighborhood VARCHAR(100) NOT NULL,
    street VARCHAR(100) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE rescues (
    animal_id INT NOT NULL,
    date DATE NOT NULL,
    rescuers VARCHAR(100) NOT NULL,
    organization VARCHAR(100) NOT NULL,
    notes TEXT NOT NULL,

    PRIMARY KEY (animal_id),
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
);

CREATE TABLE rescues_addresses (
    rescue_id INT NOT NULL,
    address_id INT NOT NULL,

    PRIMARY KEY (rescue_id),
    FOREIGN KEY (rescue_id) REFERENCES rescues(id) ON DELETE CASCADE,
    FOREIGN KEY (address_id) REFERENCES addresses(id) ON DELETE CASCADE
);


CREATE TABLE adoptions (
    animal_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    adopters VARCHAR(100) NOT NULL,

    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
);

CREATE TABLE adoptions_addresses (
    rescue_id INT NOT NULL,
    address_id INT NOT NULL,

    PRIMARY KEY (rescue_id),
    FOREIGN KEY (rescue_id) REFERENCES rescues(id) ON DELETE CASCADE,
    FOREIGN KEY (address_id) REFERENCES addresses(id) ON DELETE CASCADE
);