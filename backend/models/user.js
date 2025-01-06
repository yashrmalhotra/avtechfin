import mongoose, {Schema} from "mongoose"
const userSchema = new Schema({
    email:{type:String,required:[true,"please enter email"],unique:true},
    password:{type:String,required:[true,"please enter password"]},
    isVerified:{type:Boolean,default:false},
    expiredAt:Date
})
const User = mongoose.model("User",userSchema)
export default User