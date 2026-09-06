-- Version 1
CREATE TABLE users 
(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE CHECK (position('@' IN email) > 0),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Version 2
ALTER TABLE users 
ADD COLUMN password_hash VARCHAR(255);

INSERT INTO users (email, name, password_hash)
VALUES
('ahmed@gmail.com', 'Ahmed', '123'),
('sara@gmail.com', 'Sara', '123'),
('mohamed@gmail.com', 'Mohamed', '123'),
('mariam@gmail.com', 'Mariam', '123'),
('omar@gmail.com', 'Omar', '123'),
('nour@gmail.com', 'Nour', '123'),
('youssef@gmail.com', 'Youssef', '123'),
('menna@gmail.com', 'Menna', '123'),
('karim@gmail.com', 'Karim', '123'),
('salma@gmail.com', 'Salma', '123');

SELECT * FROM users;