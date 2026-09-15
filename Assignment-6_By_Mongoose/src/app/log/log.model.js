const { Schema, model } = require("mongoose");
const logSchema = new Schema(
    {
        action:{type:String,required:true},
        message:{type:String,required:true},
        bookId:{type:Schema.Types.ObjectId , ref:'Book'}
    },
    {
        timestamps:true,
        _id:true,
        capped:{
            size:1048576
        }
    }
)

const Log = model('Log',logSchema,'logs');
module.exports = Log;