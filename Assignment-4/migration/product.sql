-- The small retail store needs a RESTful API to manage information about its products, suppliers, and sales.
-- 1. Products Table:
-- o ProductID: Unique identifier for each product (integer, primary key, auto-increment).
-- o ProductName: Name of the product (text).
-- o Price: Price of the product (decimal).
-- o StockQuantity: Quantity of the product in stock (integer).
-- o SupplierID: ID of the supplier providing the product (integer, foreign key referencing Suppliers).

CREATE TABLE products (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL check (price > 0),
    StockQuantity INT NOT NULL DEFAULT 0 check (StockQuantity>=0),
    SupplierID INT NOT NULL,
     FOREIGN KEY (SupplierID) REFERENCES suppliers(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO products (name, price, StockQuantity, SupplierID)
VALUES
('Laptop', 25000.00, 10, 1),
('Mouse', 500.00, 50, 1),
('Keyboard', 1200.00, 30, 2),
('Headphones', 1500.00, 20, 2),
('USB Cable', 250.00, 100, 3);

SELECT * FROM products;