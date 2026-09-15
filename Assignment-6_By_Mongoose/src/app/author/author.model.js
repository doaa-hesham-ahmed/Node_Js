const { Schema, model } = require("mongoose");

const authorSchema = new Schema(
    {
        name :         {type:String , required:true},
        nationality :  String
    },
    {
        timestamps:true,
        _id:true
    }
)
const Author = model('Author',authorSchema,'authors');
module.exports = Author;