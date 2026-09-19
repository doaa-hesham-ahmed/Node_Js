import { model, Schema } from "mongoose";

const messageSchema = new Schema(
    {
     content:{
        type:String,
        required:true,
        minlenth:3,
        maxlength:200,
        trim:true,
     },
     receviver:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
     },
     sender:{
        type:Schema.Types.ObjectId,
        ref:'User'
     },
     isDeleted:{
        type:Boolean,
        default:false
     },
    },
    {
      timestamps:{
        createdAt:true,
        updatedAt:true
      }
    });

   const Message = model('Message',messageSchema);
    export default Message;