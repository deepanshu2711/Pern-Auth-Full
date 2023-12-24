import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import db from "../db.Config.js"
export const test = (req,res) =>{
    res.json({message :"Api is working"})
}


//update user

export const updateUser =async(req,res,next)=>{
    if(req.user.id === req.params.id){
        
        return next(errorHandler(401,"You can update only your account"));
    }
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        }
        const updatedUser = await db.query("update users set username =$1 , email =$2 , password = $3 where id = $4 returning *",[req.body.username ,req.body.email,req.body.password,req.params.id]);
        res.status(200).json(updatedUser.rows[0]);
    } catch (error) {
        next(error)
    }
}


export const deleteUser =async(req,res,next)=>{
    if(req.user.id != req.params.id){
        console.log(req.user.id , req.params.id)
        return next(errorHandler(401,"You can delete only your account"));
    }
    try {
        await db.query("delete from users where id = $1",[req.params.id]);
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(error)
    }
}