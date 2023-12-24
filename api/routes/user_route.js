import express from "express";
import { test, updateUser } from "../controllers/user_controller.js";
import { verifyToken } from "../utils/verifyuser.js";
import { deleteUser } from "../controllers/user_controller.js";

const router = express.Router();

router.get("/" ,test )
router.post('/update/:id' ,verifyToken ,updateUser)
router.delete('/delete/:id' ,verifyToken ,deleteUser)



export default router;