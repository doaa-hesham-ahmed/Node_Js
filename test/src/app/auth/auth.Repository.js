const pool = require('./../../common/db/db');

const findUserByEmail = async(email) =>{
    const {rows } = await pool.query(`SELECT EXISTS ( SELECT 1 FROM users WHERE email = $1) AS email_exist`,[email]);
    return rows[0].email_exist;
};

const createUser = async (name,email,password_hash) =>{
    const {rows } = await pool.query(`INSERT INTO users  (name,email,password_hash) VALUES ($1 ,$2 ,$3) RETURNING name,email,password_hash`,[name,email,password_hash]);
    return rows[0];
};

module.exports={
    findUserByEmail,
    createUser
};

