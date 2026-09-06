const {Router} = require('express');
const pool = require('./../../common/db/db')
const healthRoute = Router();

healthRoute.get('/',async(req,res)=>{
 const {rows} = await pool.query(`SELECT 2+2 AS Result `);
 res.json({message:"Router is conneccted successfully",success:true,data:rows[0]});
})

module.exports = healthRoute;