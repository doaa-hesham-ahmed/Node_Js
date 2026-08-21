-- 3. Sales Table:
-- o SaleID: Unique identifier for each product (integer, primary key, auto-increment).
-- o ProductID: Reference to the product sold (integer, foreign key referencing Products).
-- o QuantitySold: Quantity of the product sold (integer).
-- o SaleDate: Date of sale (date).

CREATE TABLE sales (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    QuantitySold INT  NOT NULL check (QuantitySold>0),
    SaleDate DATE NOT NULL DEFAULT (CURRENT_DATE),
    productId INT NOT NULL,
     Foreign Key (productId) REFERENCES products(id) ON DELETE CASCADE ON UPDATE RESTRICT
);
INSERT INTO sales (QuantitySold, SaleDate, productId)
VALUES
(2, '2026-08-15', 1),
(5, '2026-08-15', 2),
(1, '2026-08-16', 3),
(3, '2026-08-17', 4),
(10, '2026-08-18', 5);

SELECT * FROM sales;