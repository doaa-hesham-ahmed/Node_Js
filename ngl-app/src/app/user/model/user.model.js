import { model, Schema } from "mongoose"
const userSchema = new Schema(
    {
     name:{
       type:String,
       required:true,
       minlength:3,
       maxlength:20,
       trim:true
     },
     email:{
       type:String,
       required:true,
       unique:true,
       trim:true,
       lowercase:true
     },
     password:{
        type:String,
        required:function(){
            return this.provider === 'local';
        },
        trim:true

     },
     provider:{
        type:String,
        ENUM :['google','facebook','local'],
        default:'local'

     },
     isDeleted:{
        type:Boolean,
        default:false

     },
     isVerify:{
        type:Boolean,
        default:false

     },
     dop:{
        type:Date

     },
     gender:{
        type:String,
        ENUM:['male','female'],
        default:'male'

     },
    },
    {
     timestamps:{
        createdAt:true,
        updatedAt:true
     }
    })

const User = model('User',userSchema);
export default User;