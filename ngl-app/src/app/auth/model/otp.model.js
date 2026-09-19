import { model, Schema } from "mongoose";

const otpSchema = new Schema(
    {
        code:{
            type:String,
            required:true,
            length:6
        },
        email:{
            type:String,
            required:true,
            trim:true
        },
    
         expiredAt:{
            type:Date,
            required:true,
            index:{expires:0}
            },
            attempts:{
                type:Number,
                default:0
            }
        
    },
    {
        timestamps:{
            createdAt:true,
            updatedAt:false
        }
    }
);
// otpSchema.index({createdAt:1},{expireAfterSeconds:600});
const Otp = model('Otp',otpSchema);
export default Otp;