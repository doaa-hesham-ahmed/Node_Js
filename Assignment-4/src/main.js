const { config } = require("dotenv");
config();

const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

// Router
const productRouter = express.Router();
const supplierRouter = express.Router();
const sallerRouter = express.Router();

app.use(express.json());
app.use("/products", productRouter);
app.use("/suppliers", supplierRouter);
app.use("/saller", sallerRouter);

// Database connection
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Check DB
productRouter.get("/health", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT 4 + 4 AS result");

        res.json({ message: "test data", success: true, data: rows });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// Create Product
productRouter.post("/", async (req, res) => {

    const { name, price, stock, SupplierID } = req.body;

    try {

        // Validation
        if (!name || price === undefined || stock === undefined) {
            throw new Error("name, price and stock are required");
        }

        if (price < 0) {
            throw new Error("price cannot be negative");
        }

        if (stock < 0) {
            throw new Error("stock cannot be negative");
        }

        // Insert product
        const { rows } = await pool.query(
            `INSERT INTO products (name, price, stockquantity, SupplierID)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [name, price, stock, SupplierID]
        );

        res.status(201).json({ message: "create product successfully", success: true, data: rows[0] });

    } catch (error) {

        res.status(500).json({ message: error.message, success: false });

    }
});
//● Retrieve all products.
productRouter.get("/", async (req, res) => {
    const {page,limit} = req.query;
    const offset = (page - 1 )* limit;
    try {
        const { rows } = await pool.query(`SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2`,[limit,offset]);
        if(rows.length===0) res.status(404).json({message:"products is not found", success:true ,success: false })
        res.status(200).json({ message: "retrieve all products successfully", success: true, data: rows });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
//10. Create a reporting endpoint to retrieve the product with the highest stock quantity. (0.5 Grade)
productRouter.get("/highest-stock",async(req,res)=>{
    try{
        
    const {rows} = await pool.query(`SELECT * FROM products ORDER BY stockquantity DESC LIMIT 1`);
    if (rows.length === 0) return res.status(404).json({ message: "product with this id not found", success: false });
     res.status(200).json({ message: "Retrieve product with highest stock quantity successfully", success: true, data: rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

//12. Create a reporting endpoint to retrieve all products that have never been sold. (0.5 Grade)
productRouter.get("/never-sold",async(req,res)=>{
    try{
        
    const {rows} = await pool.query(`SELECT * FROM products LEFT JOIN sales ON products.id = sales.ProductID WHERE sales.ProductID IS NULL`);
    if (rows.length === 0) return res.status(404).json({ message: "product with this id not found", success: false });
     res.status(200).json({ message: "retrieve the total quantity sold successfully", success: true, data: rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

//● Retrieve a product by ID.
productRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        if (id == -1) {
            res.status(404).json({ message: error.message, success: false })
        }
        const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [id])

        if (rows.length === 0) {
            res.status(404).json({ message: "product is not found", success: false })
        }
        res.status(201).json({ message: "Retrieve products by id successfully", success: true, data: rows[0] });


    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

//8. Create an API endpoint to delete delete the product 'Eggs'. (0.5 Grade)
productRouter.delete("/remove-Eggs", async (req, res) => {
    try {
        const { rows } = await pool.query(`DELETE FROM products WHERE name = 'Eggs' RETURNING *` );
        if (rows.length === 0) return res.status(404).json({ message: "product with this id not found", success: false });
        res.status(200).json({ message: "delete the product Eggs successfully", success: true, data: rows[0] });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
//7. Create an API endpoint to update the price of 'Bread' to 25.00. (0.5 Grade)
productRouter.put("/update-price", async (req, res) => {
    console.log("update price route");
    try {
        const { rows } = await pool.query(`UPDATE products SET price = 25.00 WHERE name = 'Bread' RETURNING id ,name,price` );
        if (rows.length === 0) return res.status(404).json({ message: "product with this id not found", success: false });
        res.status(200).json({ message: "price of Brread is update successfully", success: true, data: rows[0] });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
// ● Update a product.
productRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, price, stock, SupplierID } = req.body;
    try {
        if (!name || price === undefined || stock === undefined) {
            throw new Error("name, price and stock are required");
        }
        if (price < 0) {
            throw new Error("price canot be negative");
        }
        if (stock < 0) {
            throw new Error("stock is canot be negative");
        }
        const { rows } = await pool.query(`UPDATE products
                                                 SET name = $1,
                                                    price = $2,
                                                    stockquantity = $3,
                                                    SupplierID = $4
                                                 RETURNING *`,
                                                    [name, price, stock, SupplierID]);

        if (rows.length === 0) {
            res.status(404).json({ message: "product with this id not found", success: false });
        }
        res.status(200).json({ message: "product is update successfully", success: true, data: rows[0] });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// ● Delete a product.
productRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(`DELETE FROM PRODUCTS WHERE id = $1  RETURNING *`,[id]);
        if(rows.length===0){
            res.status(404).json({ message: "product with this id not found", success: false });
        }
        res.status(200).json({message: "product is deleted successfully" , success:true,data:rows[0]});
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
// ● Delete all product.
productRouter.delete("/", async (req, res) => {
    try {
        const { rows } = await pool.query(`DELETE FROM PRODUCTS  RETURNING *`);
        if(rows.length===0){
            res.status(404).json({ message: "product with this id not found", success: false });
        }
        res.status(200).json({message: "product is deleted successfully" , success:true , data:rows});
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
})

//===========================================================================================

//● Create a supplier.
supplierRouter.post("/", async(req,res)=>{
    const {name,ContactNumber}=req.body;
    try {
        if(!name || !ContactNumber) throw new Error("the name ,contactNumber is required");
        if(name.length<2) throw new Error("the name require to more than or equel 3");
        if(!/^[0-9]{11}$/.test(ContactNumber)) throw new Error("the contactNumber require to 11 digit ");
         const { rows } = await pool.query(`INSERT INTO suppliers 
                                                   (name, ContactNumber)
                                                    VALUES($1,$2)
                                                    RETURNING * `,
                                                    [name,ContactNumber]);
    
        res.status(200).json({message: "supplier is Created successfully" , success:true , data:rows[0]});
    } catch (error) {
         res.status(500).json({ message: error.message, success: false });
    }
});


//● Retrieve all suppliers.
supplierRouter.get("/", async(req,res)=>{
    const {page,limit} =req.query;
    const offset = (page - 1 )*limit;
    try {
         const { rows } = await pool.query(`SELECT * FROM suppliers ORDER BY id LIMIT $1 OFFSET $2 `,[limit,offset]);
         if(rows.length===0) res.status(404).json({message:"Suppliers is not found", success:true ,success: false });
        res.status(200).json({message: "supplier is  All Retrieve successfully" , success:true , data:rows});
    } catch (error) {
         res.status(500).json({ message: error.message, success: false });
    }
});

//11. Create a reporting endpoint to retrieve suppliers whose names start with 'F'. (0.5 Grade)
supplierRouter.get("/start-with-F", async(req,res)=>{
    
    try {
         const { rows } = await pool.query(`SELECT * FROM suppliers WHERE name LIKE 'F%'`);
         if(rows.length===0) res.status(404).json({message:"Suppliers is not found", success:true ,success: false });
        res.status(200).json({message: "retrieve suppliers whose names start with 'F' successfully" , success:true , data:rows});
    } catch (error) {
         res.status(500).json({ message: error.message, success: false });
    }
});

//● Retrieve by id suppliers.
supplierRouter.get("/:id", async(req,res)=>{
    const {id}=req.params;
    try {
         const { rows } = await pool.query(`SELECT * FROM suppliers WHERE id = $1`,[id]);
         if(rows.length===0) res.status(404).json({message:"Suppliers is not found",success: false });
        res.status(200).json({message: "supplier is Retrieve by id  successfully" , success:true,data:rows[0]});
    } catch (error) {
         res.status(500).json({ message: error.message, success: false });
    }
});


//● Update supplier information.
supplierRouter.put("/:id", async(req,res)=>{
    const {id} = req.params;
     const {name,ContactNumber} = req.body;
    try {
         if(!name || !ContactNumber) throw new Error("the name , contactNumber is required");
        if(name.length<2) throw new Error("the name require to more than or equel 3");
        if(!/^[0-9]{11}$/.test(ContactNumber)) throw new Error("the contactNumber require to 11 digit ");
         const { rows } = await pool.query(`UPDATE suppliers
                                                 SET name = $1,
                                                 ContactNumber = $2
                                                 WHERE id = $3
                                                 RETURNING *`,
                                                    [name, ContactNumber,id]);
         if(rows.length===0) res.status(404).json({message:"Suppliers is not found",success: false });
        res.status(200).json({message: "supplier is updated successfully" , success:true , data:rows[0]});
    } catch (error) {
         res.status(500).json({ message: error.message, success: false });
    }
});


//● Delete a supplier by id.
supplierRouter.delete("/:id", async(req,res)=>{
    const {id} = req.params;
    try {
         const { rows } = await pool.query(`DELETE FROM suppliers WHERE id = $1 RETURNING *`,[id]);
           if(rows.length===0) return res.status(404).json({message:"Suppliers is not found",success: false });
        res.status(200).json({message: "supplier is deleted successfully" , success:true , data:rows[0]});
    } catch (error) {
         res.status(500).json({ message: error.message, success: false });
    }
});

//● Delete All a supplier.
supplierRouter.delete("/", async(req,res)=>{
    try {
         const { rows } = await pool.query(`DELETE FROM suppliers RETURNING *`);
         if(rows.length===0) return res.status(404).json({message:"Suppliers is not found",success: false });
        res.status(200).json({message: "supplier is deleted successfully" , success:true , data:rows[0]});
    } catch (error) {
         res.status(500).json({ message: error.message, success: false });
    }
});

//==========================================================================
//salles
// ● Record a sale.
// Record a sale
sallerRouter.post("/", async (req, res) => {

    const { QuantitySold, productId } = req.body;

    try {
        if (!QuantitySold || !productId) throw new Error("QuantitySold and productId are required");
        if (QuantitySold <= 0) throw new Error("QuantitySold must be greater than 0");

        const { rows } = await pool.query(
            `INSERT INTO sales (QuantitySold, productId)
             VALUES ($1, $2)
             RETURNING *`,
            [QuantitySold, productId]
        );

        res.status(201).json({message: "sale recorded successfully",success: true,data: rows[0]});

    } catch (error) {
        res.status(400).json({ message: error.message,success: false});
    }
});

// ● Retrieve all sales.
sallerRouter.get("/", async(req,res)=>{
    const {page,limit} = req.query;
    const offset = (page - 1 )*limit;
    
    try {
         const { rows } = await pool.query(`SELECT * FROM sales ORDER BY id LIMIT $1 OFFSET $2`,[limit,offset]);
         if(rows.length===0) res.status(404).json({message:"sales is not found", success:true ,success: false });
        res.status(200).json({message: "sales is  All Retrieve successfully" , success:true , data:rows});
    } catch (error) {
         res.status(500).json({ message: error.message, success: false });
    }
});

//9. Create a reporting endpoint to retrieve the total quantity sold for each product using SQL aggregate functions. (0.5 Grade)
sallerRouter.get("/Quantity-Sold",async(req,res)=>{
    try{
        
    const {rows} = await pool.query(`SELECT ProductID, SUM(QuantitySold) AS total_quantity_sold FROM sales GROUP BY ProductID `);
    if (rows.length === 0) return res.status(404).json({ message: "product with this id not found", success: false });
     res.status(200).json({ message: "retrieve the total quantity sold successfully", success: true, data: rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

//13. Create a reporting endpoint to retrieve all sales including: (0.5 Grade)
// ● Product name
// ● Quantity sold
// ● Sale date using SQL JOIN operations.
sallerRouter.get("/all-sales",async(req,res)=>{
    try{
        
    const {rows} = await pool.query(`SELECT products.name,sales.QuantitySold,sales.SaleDate FROM sales INNER JOIN products ON sales.ProductID = products.id;`);
    if (rows.length === 0) return res.status(404).json({ message: "product with this id not found", success: false });
     res.status(200).json({ message: "retrieve all-sales successfully", success: true, data: rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// ● Retrieve sales for a specific product.
sallerRouter.get("/:productId", async(req,res)=>{
       const {productId} =req.params
    try {
         const { rows } = await pool.query(`SELECT * FROM sales WHERE productId=$1 `,[productId]);
         if(rows.length===0) res.status(404).json({message:"sales is not found", success:true ,success: false });
        res.status(200).json({message: "Retrieve sales for a specific product successfully" , success:true , data:rows[0]});
    } catch (error) {
         res.status(500).json({ message: error.message, success: false });
    }
});

//=============================================================================
//● Add a Category column to the Products table.
productRouter.post("/Add-Category", async(req,res)=>{
    
    try {
          await pool.query(`ALTER TABLE products ADD COLUMN Category VARCHAR(50)`);
        res.status(200).json({message: "Add a Category column to the Products successfully" , success:true });
    } catch (error) {
         res.status(500).json({ message: error.message, success: false });
    }
});
//● Remove the Category column.

productRouter.delete("//delete-category", async(req,res)=>{
    
    try {
          await pool.query(`ALTER TABLE products DROP COLUMN category`);
        res.status(200).json({message: "Delete a Category column to the Products successfully" , success:true });
    } catch (error) {
         res.status(500).json({ message: error.message, success: false });
    }
});
//● Change ContactNumber to VARCHAR(15).
supplierRouter.put("//change-number",async(req,res)=>{
    try {
        await pool.query(`ALTER TABLE  suppliers ALTER COLUMN ContactNumber TYPE VARCHAR(15)`);
        res.status(200).json({message:"Change ContactNumber to VARCHAR(15) successfully ." , success:true});
    } catch (error) {
        res.status(500).json({message:error.message , success:false});
    }
});

//● Add a NOT NULL constraint to ProductName.
productRouter.put("//Add-constraint",async(req,res)=>{
    try {
        await pool.query(` ALTER TABLE products ALTER COLUMN name SET NOT NULL`);
        res.status(200).json({message:"Add a NOT NULL constraint to ProductName successfully ." , success:true});
    } catch (error) {
        res.status(500).json({message:error.message , success:false});
    }
});

//=============================================================================
//a. Add a supplier with the name 'FreshFoods' and contact number '01001234567'.
//b. Insert the following three products, all provided by 'FreshFoods':
//c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.
app.post("/initialize-data", async (req, res) => {
    const client = await pool.connect();

    try {
        // Begin transaction
        await client.query("BEGIN");

        // 1. Add supplier
        const supplierResult = await client.query(`
            INSERT INTO suppliers (name, ContactNumber)
            VALUES ($1, $2)
            RETURNING id
        `, ["FreshFoods", "01001234567"]);

        const supplierId = supplierResult.rows[0].id;

        // 2. Add Milk
        const milkResult = await client.query(`
            INSERT INTO products
                (name, price, StockQuantity, SupplierID)
            VALUES ($1, $2, $3, $4)
            RETURNING id
        `, ["Milk", 15.00, 50, supplierId]);

        const milkId = milkResult.rows[0].id;

        // 3. Add Bread
        await client.query(`
            INSERT INTO products
                (name, price, StockQuantity, SupplierID)
            VALUES ($1, $2, $3, $4)
        `, ["Bread", 10.00, 30, supplierId]);

        // 4. Add Eggs
        await client.query(`
            INSERT INTO products
                (name, price, StockQuantity, SupplierID)
            VALUES ($1, $2, $3, $4)
        `, ["Eggs", 20.00, 40, supplierId]);

        // 5. Add sale of 2 Milk units
        await client.query(`
            INSERT INTO sales
                (QuantitySold, SaleDate, productId)
            VALUES ($1, $2, $3)
        `, [2, "2025-05-20", milkId]);

        // Commit transaction
        await client.query("COMMIT");
        res.status(201).json({message: "Supplier, products and sale added successfully",success: true});

    } catch (error) {
        // Rollback if any query fails
        await client.query("ROLLBACK");
        res.status(500).json({message: error.message,success: false});

    } finally {
      await client.release();
    }
});

//7. Create an API endpoint to update the price of 'Bread' to 25.00. (0.5 Grade)
productRouter.put("/update-price", async (req, res) => {
    console.log("update price route");
    try {
        const { rows } = await pool.query(`UPDATE products SET price = 25.00 WHERE name = 'Bread' RETURNING id ,name,price` );
        if (rows.length === 0) return res.status(404).json({ message: "product with this id not found", success: false });
        res.status(200).json({ message: "price of Brread is update successfully", success: true, data: rows[0] });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});


//8. Create an API endpoint to delete delete the product 'Eggs'. (0.5 Grade)
productRouter.delete("/remove-Eggs", async (req, res) => {
    try {
        const { rows } = await pool.query(`DELETE FROM products WHERE name = 'Eggs' RETURNING *` );
        if (rows.length === 0) return res.status(404).json({ message: "product with this id not found", success: false });
        res.status(200).json({ message: "delete the product Eggs successfully", success: true, data: rows[0] });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

//9. Create a reporting endpoint to retrieve the total quantity sold for each product using SQL aggregate functions. (0.5 Grade)

sallerRouter.get("/Quantity-Sold",async(req,res)=>{
    try{
        
    const {rows} = await pool.query(`SELECT ProductID, SUM(QuantitySold) AS total_quantity_sold FROM sales GROUP BY ProductID `);
    if (rows.length === 0) return res.status(404).json({ message: "product with this id not found", success: false });
     res.status(200).json({ message: "retrieve the total quantity sold successfully", success: true, data: rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

//10. Create a reporting endpoint to retrieve the product with the highest stock quantity. (0.5 Grade)
productRouter.get("/highest-stock",async(req,res)=>{
    try{
        
    const {rows} = await pool.query(`SELECT * FROM products ORDER BY stockquantity DESC LIMIT 1`);
    if (rows.length === 0) return res.status(404).json({ message: "product with this id not found", success: false });
     res.status(200).json({ message: "retrieve the total quantity sold successfully", success: true, data: rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

//11. Create a reporting endpoint to retrieve suppliers whose names start with 'F'. (0.5 Grade)
supplierRouter.get("/start-with-F", async(req,res)=>{
    
    try {
         const { rows } = await pool.query(`SELECT * FROM suppliers WHERE name LIKE 'F%'`);
         if(rows.length===0) res.status(404).json({message:"Suppliers is not found", success:true ,success: false });
        res.status(200).json({message: "retrieve suppliers whose names start with 'F' successfully" , success:true , data:rows});
    } catch (error) {
         res.status(500).json({ message: error.message, success: false });
    }
});

//12. Create a reporting endpoint to retrieve all products that have never been sold. (0.5 Grade)
productRouter.get("/never-sold",async(req,res)=>{
    try{
        
    const {rows} = await pool.query(`SELECT * FROM products LEFT JOIN sales ON products.id = sales.ProductID WHERE sales.ProductID IS NULL`);
    if (rows.length === 0) return res.status(404).json({ message: "product with this id not found", success: false });
     res.status(200).json({ message: "retrieve the total quantity sold successfully", success: true, data: rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

//13. Create a reporting endpoint to retrieve all sales including: (0.5 Grade)
// ● Product name
// ● Quantity sold
// ● Sale date using SQL JOIN operations.
sallerRouter.get("concatt",async(req,res)=>{
    try{
        
    const {rows} = await pool.query(`SELECT products.name,sales.QuantitySold,sales.SaleDate FROM sales LEFT JOIN products ON sales.ProductID = products.id;`);
    if (rows.length === 0) return res.status(404).json({ message: "product with this id not found", success: false });
     res.status(200).json({ message: "retrieve the total quantity sold successfully", success: true, data: rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`server is Running on port ::: ${PORT}`);
});