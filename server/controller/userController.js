import User from "../model/User.js";
import bcrypt from 'bcrypt';
import { createError } from '../middleware/error.js'
import jwt from 'jsonwebtoken'


const maxAge = 3 * 24 * 60 * 60;


const createToken = (data) => {
    console.log(data);
    console.log(process.env.JWT_KEY);
    return jwt.sign({ user:data },"hai",{expiresIn:maxAge});
}
//user registrations
export const userSignup = (async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            const passwordHash = await bcrypt.hash(req.body.password, 10)
            const data = await User.create({
                isAdmin: false,
                name: req.body.name,
                phone_number: req.body.phone_number,
                email: req.body.email,
                password: passwordHash,
                isDeleted: false,
            })

            const token = createToken(data);

            // const { password, isAdmin, ...otherDetails } = data._doc
            res.cookie("jwt_token",token,{
                withCredentials:true,
                httpOnly:false,
                maxAge:maxAge * 1000
            })
            res.status(200).json({ created: true, details: req.body })
        } else {
           const err = createError(400, "User already exist !..")
           res.json({err:err,created:false})
      
        }
    } catch (error) {
        const err = createError(400,error.message)
        res.json({err:err,created:false})
        
    }
})



//User Login
export const userLogin = (async (req, res, next) => {
    try {

        let user = await User.findOne({ email: req.body.email })
        if (!user) return next(createError(404, 'User  not exist !..'))
        let isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        const { password, isAdmin, ...otherDetails } = user._doc
        const token = createToken(otherDetails)
       
        if (isPasswordCorrect && !isAdmin) {
            res.cookie("jwt_token",token,{
                withCredentials:true,
                httpOnly:false,
                maxAge:maxAge*1000
            })
            res.status(200).json({ created:true,details:otherDetails })
        } else {
            const err = createError(400, 'Password is incorrect');
            res.json({err:err,created:false})
        }
    } catch (error) {
        // const err = createError(400, error.message);
        // res.json({err:err,created:false})
        next(error)
    }
})