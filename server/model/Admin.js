import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    isAdmin:Boolean,
    email:String,
    password:String
},{timestamps:true})


export default mongoose.model("Admins",adminSchema)