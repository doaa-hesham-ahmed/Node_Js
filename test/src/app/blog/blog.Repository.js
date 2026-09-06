const pool = require('../../common/db/db');

const findBlogById = async (id) => {
    const { rows } = await pool.query(`SELECT EXISTS (SELECT 1 FROM blogs  WHERE id = $1) AS result`,[id] );

    return rows[0].result;
};


const creatBlog = async (title,description,author_id)=>{
    const {rows} =await pool.query(`INSERT INTO blogs (title,description,author_id) VALUES ($1,$2,$3) RETURNING *`,[title,description,author_id]);
    return rows[0];
};

const deleteHArdBlog = async(id,author_id)=>{
 const {rows} = await pool.query(`DELETE FROM blogs WHERE id = $1 AND author_id=$2 RETURNING * `,[id,author_id]);
 return rows[0];
}

const deleteSOFTBlog = async(id,author_id)=>{
 const {rows} = await pool.query(`UPDATE blogs SET updata_at=NOW(),is_Delelte=TRUE WHERE id = $1 AND author_id=$2 AND is_Delelte=FALSE  RETURNING * `,[id,author_id]);
 return rows[0];
}

const restorBlog = async(id,author_id)=>{
 const {rows} = await pool.query(`UPDATE blogs SET updata_at=NOW(),is_Delelte=FALSE WHERE id = $1 AND author_id=$2  RETURNING * `,[id,author_id]);
 return rows[0];
}

const updatBlog = async(id,author_id)=>{
 const {rows} = await pool.query(`UPDATE blogs SET updata_at=NOW() WHERE id = $1 AND author_id=$2  RETURNING * `,[id,author_id]);
 return rows[0];
}



module.exports = { findBlogById , creatBlog , deleteHArdBlog , deleteSOFTBlog,restorBlog,updatBlog}
