-- 2. Suppliers Table:
-- o SupplierID: Unique identifier for each product (integer, primary key, auto-increment).
-- o SupplierName: Name of the supplier (text).
-- o ContactNumber: Supplier’s contact number (text).

CREATE TABLE suppliers (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) not NULL,
    ContactNumber VARCHAR(20) NOT NULL 
    
);
INSERT INTO suppliers (name, ContactNumber)
VALUES
('ABC Supplies', '01012345678'),
('Tech World', '01123456789'),
('Fresh Market', '01234567890');

SELECT * FROM suppliers;
