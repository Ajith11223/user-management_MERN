import express from 'express';
const router = express.Router()
import {userSignup,userLogin} from '../controller/userController.js'


//User Registrations
router.post('/signup', userSignup)



//User Login
router.post('/login', userLogin)



export default router;