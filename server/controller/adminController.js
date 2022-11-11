import Admin from '../model/Admin.js'
import bcrypt from 'bcrypt'
import { createError } from '../middleware/error.js'
import User from '../model/User.js'
import jwt from 'jsonwebtoken'


const maxAge = 3 * 24 * 60 * 60;


const createToken = (data) => {

    console.log(process.env.JWT_KEY);
    return jwt.sign({ user:data },"hai",{expiresIn:maxAge});
}


//AdminLogin 
export const AdminAuth = (async(req,res,next)=>{
    try {
       
        //admin check
        const admin = await Admin.findOne({email:req.body.email})
        if (!admin) return next(createError(404,"User not exist !.."))
        
        const { password, ...otherDetails } = admin._doc
   
        const token = createToken(otherDetails)
     
        // Password check

        const isPasswordCorrect = await bcrypt.compare(req.body.password,admin.password)
        if (isPasswordCorrect && admin.isAdmin){
            res.cookie("token",token,{
                withCredentials:true,
                httpOnly:true,
                secure:false,
                maxAge:maxAge*1000
            })
            res.status(200).json({ created:true,details:otherDetails })
        }else{
            return next(createError(400, "Password is incorrect !.."))
        } 

        
    } catch (err) {
        next(err)
    }
})

//Add user
export const addUser = (async(req,res,next)=>{
    try {
        let user = await User.findOne({email:req.body.email})
        if (!user) {
            const passwordHash = await bcrypt.hash(req.body.password,10)
            let addData = User.create({
                isAdmin:false,
                name:req.body.name,
                phone_number:req.body.phone_number,
                email:req.body.email,
                password:passwordHash,
                isDeleted:false
            })
            res.status(200).json('added successfulyy')
        }else{
            return next(createError(400,"user is already exist"))
        }
    } catch (error) {
        console.log(error);
    }
})


//deleted User
export const deleteUser = (async(req,res,next)=>{
    try {
        console.log(req.params.id);
        let deleteUser = await User.findByIdAndDelete(req.params.id)
        if (deleteUser) {
            res.status(200).json('user Deleted successfully')
        }else{
            return next(createError(500,"not deletd"))
        }
        
    } catch (error) {
        console.log(error);
    }
})



//Update User
export const updateUser = (async(req,res,next)=>{
    try {
        let updateData = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});
        res.status(200).json('update successfully')
    } catch (error) {
        console.log(error);
    }
})


//get all users
export const getAllUser = (async(req,res,next)=>{
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    } catch (error) {
        console.log(error);
    }
})

//get One user

export const getOneUser = (async(req,res,next)=>{
    try {
        const userData = await User.findById(req.params.id);
        res.status(200).json(userData)
    } catch (err) {
        next(err)
    }

})