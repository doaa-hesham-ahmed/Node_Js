
-- CREATE TYPE user_role AS ENUM ('customer', 'Admin', 'saller');
-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(50) NOT NULL,
--     email VARCHAR(255) UNIQUE NOT NULL
--         CHECK (POSITION('@' IN email) > 0),
--     pass_hash TEXT UNIQUE NOT NULL,
--     is_active BOOLEAN NOT NULL DEFAULT FALSE,
--     role user_role NOT NULL DEFAULT 'customer',
--     created_at TIMESTAMP NOT NULL DEFAULT NOW()
-- );

-- CREATE TABLE customer_profiles (
--     user_id INT PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE  ,
--     full_name VARCHAR(50) NOT NULL ,
--     phone VARCHAR(20) ,
--     dop DATE NOT NULL DEFAULT CURRENT_DATE,
--     loyalty_points INT NOT NULL DEFAULT 0 CHECK(loyalty_points >=0) 
-- );

-- CREATE TABLE products (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(100) NOT NULL ,
--   price NUMERIC (10,2) NOT NULL CHECK (price>0) ,
--   stock INT NOT NULL DEFAULT 0 CHECK (stock>=0),
--   metadata JSONB DEFAULT '{}',
--   created_at TIMESTAMP DEFAULT NOW()
-- );

-- CREATE TYPE status_order AS ENUM('pending', 'prepred', 'delivered_at');
-- CREATE TABLE orders (
--    id SERIAL PRIMARY KEY,
--    user_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE ,
--    total NUMERIC(10,2) NOT NULL CHECK(total>0) ,
--    status  status_order NOT NULL DEFAULT 'pending',
--    created_at TIMESTAMP DEFAULT NOW(),
--    delivered_at TIMESTAMP
-- );

-- CREATE TABLE order_items(
--    id SERIAL PRIMARY KEY,
--    order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
--    product_id INT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
--    quantity INT NOT NULL CHECK(quantity>0),
--    unit_price NUMERIC(10,2) NOT NULL CHECK(unit_price>0)
-- );


-- INSERT INTO users (name, email, pass_hash)
-- VALUES
--     ('Doaa', 'doaa1@gmail.com', '123455'),
--     ('Roaa', 'roaa1@gmail.com', '123466'),
--     ('mena', 'mena1@gmail.com', '123477'),
--     ('mai', 'mai1@gmail.com', '123488');

-- INSERT INTO customer_profiles(user_id,full_name,phone,dop,loyalty_points)
-- VALUES 
--        (4,'DoaaHesham','01121411176','9-12-2004',1),
--        (5,'RoaaSayed','01121411177','1-2-2005',1),
--        (6,'menaMohammed','01121411178','9-12-2004',0),
--        (7,'maiyessr','01121411179','9-12-2004',0);

-- INSERT INTO products (name, price, stock, metadata)
-- VALUES
--     ('Laptop', 25000.00, 10, '{"brand": "Dell", "color": "black"}'),
--     ('Phone', 15000.00, 20, '{"brand": "Samsung", "storage": "256GB"}'),
--     ('Headphones', 2500.00, 15, '{"brand": "Sony", "wireless": true}'),
--     ('Mouse', 800.00, 30, '{"brand": "Logitech", "wireless": true}');


-- INSERT INTO orders (user_id, total, delivered_at)
-- VALUES
--     (7, 2500.00, NULL),
--     (8, 1500.00, NULL),
--     (9, 3200.00, NULL),
--     (10, 800.00, NULL);

-- INSERT INTO order_items (order_id, product_id, quantity, unit_price)
-- VALUES
--     (5, 1, 1, 25000.00),
--     (6, 2, 2, 800.00),
--     (7, 3, 1, 15000.00),
--     (8, 4, 2, 2500.00);

-- UPDATE users
-- set name = 'Menna'
-- where id=3;

-- UPDATE products
-- set stock=stock-3
-- WHERE id=1;

-- DELETE FROM products
-- WHERE id=5;

-- SELECT *
-- FROM users;

-- SELECT name
-- FROM users;

-- SELECT *
-- FROM users
-- WHERE is_active=FALSE
-- ORDER BY name DESC
-- OFFSET 1
-- LIMIT 5;
-- SELECT * FROM users;
-- SELECT 1 AS test;


-- ============================================================================================


CREATE TYPE role_user AS ENUM ('costumer','Admin','saller');
create TABLE users (
    id SERIAL PRIMARY KEY,
    userName  VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role role_user NOT NULL DEFAULT 'costumer'
    
);
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    price NUMERIC(10,2)  NOT NULL,
    stock INT NOT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT false ,
    Foreign Key (user_id) REFERENCES users(id) ON DELETE CASCADE

);

SELECT * FROM users;
INSERT INTO users(userName,email,password,phone) 
 VALUES ('DoaaHEsham','doaa@gmail.com','9122203','01157012225');