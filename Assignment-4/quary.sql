-- ============================================
-- 1. CREATE TABLES
-- ============================================

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,

    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id),

    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
);


-- ============================================
-- 2. INSERT 300,000 USERS
-- ============================================

INSERT INTO users (name, email)
SELECT
    'User ' || gs,
    'user' || gs || '@example.com'
FROM generate_series(1, 300000) AS gs;


-- ============================================
-- 3. INSERT 500,000 PRODUCTS
-- ============================================

INSERT INTO products (name, price)
SELECT
    'Product ' || gs,
    ROUND((RANDOM() * 1000 + 10)::numeric, 2)
FROM generate_series(1, 500000) AS gs;


-- ============================================
-- 4. INSERT 400,000 ORDERS
-- ============================================

INSERT INTO orders (user_id, order_date)
SELECT
    FLOOR(RANDOM() * 300000 + 1)::INT,
    CURRENT_TIMESTAMP - (RANDOM() * INTERVAL '365 days')
FROM generate_series(1, 400000) AS gs;


-- ============================================
-- 5. INSERT 600,000 ORDER ITEMS
-- ============================================

INSERT INTO order_items (order_id, product_id, quantity)
SELECT
    FLOOR(RANDOM() * 400000 + 1)::INT,
    FLOOR(RANDOM() * 500000 + 1)::INT,
    FLOOR(RANDOM() * 5 + 1)::INT
FROM generate_series(1, 600000) AS gs;


-- ============================================
-- 6. CHECK COUNTS
-- ============================================

SELECT COUNT(*) AS users_count FROM users;

SELECT COUNT(*) AS products_count FROM products;

SELECT COUNT(*) AS orders_count FROM orders;

SELECT COUNT(*) AS order_items_count FROM order_items;


-- EXPLAIN ANALYSE
-- SELECT * FROM order_items WHERE id>1199995 ORDER BY id LIMIT 5;
-- -- //time excution = 0.031
-- fater than 6123 more faster it 
-- EXPLAIN ANALYSE
-- SELECT * FROM order_items ORDER BY id LIMIT 5 OFFSET 1199995;
-- -- //time excution = 189.828

