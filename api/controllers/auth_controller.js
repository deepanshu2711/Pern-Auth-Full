import db from "../db.Config.js"
import bcryptjs from "bcryptjs";

export const signup = async(req,res) =>{  // req is the data we get from the client side 
    const{username ,email,password} = req.body;
    const  hashedPassword = bcryptjs.hashSync(password,10);
    try {
        const newUser =await db.query("insert into users (username,email,password) values ($1,$2,$3) returning *",[username,email,hashedPassword]);
        res.status(201).json({message : "User created"});

    } catch (error) {
        res.status(500).json(error.message)
    }
}