import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    isAdmin:Boolean,
    name:String,
    phone_number:Number,
    email:String,
    password:String,
    isDeleted:Boolean,
},{timestamps:true})


export default mongoose.model("User",userSchema)