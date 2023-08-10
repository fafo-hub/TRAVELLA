import express from "express";
import { updateUser, deleteUser, getUser, getUsers } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
//router.post('/', createUser)

// router.get("/checkAuthentication", verifyToken, (req,res,next) => {
//     res.send("Hello, authenticated user")
// })
// router.get("/checkuser/:id", verifyUser, (req,res,next) => {
//     res.send("Hello user, you are logged in, and can delete your account successfully")
// })
// router.get("/checkadmin/:id", verifyAdmin, (req,res,next) => {
//     res.send("Hello admin, you are logged in, and can delete all accounts successfully")
// })

//UPDATE

router.put('/:id', verifyUser, updateUser)

//DELETE

router.delete('/:id', verifyUser, deleteUser)

//GET

router.get('/:id', verifyUser , getUser)

//GET ALL

router.get('/', verifyAdmin, getUsers)


export default router