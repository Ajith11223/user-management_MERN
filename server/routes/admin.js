import express from 'express'
const router = express.Router()
import { addUser, AdminAuth, deleteUser, getAllUser, getOneUser, updateUser} from '../controller/adminController.js'
import { verifyAdmin } from '../utils/verifyToken.js'
//login admin
router.post('/adminLogin',AdminAuth)

//add User
router.post('/addUser',addUser)

//delete User
router.delete('/deletedUser/:id',verifyAdmin,deleteUser)

//upadate User
router.put('/updateUser/:id',verifyAdmin,updateUser)


//get all users
router.get('/allUsers',verifyAdmin,getAllUser)

//get one user
router.get('/getUser/:id',getOneUser)
export default router;