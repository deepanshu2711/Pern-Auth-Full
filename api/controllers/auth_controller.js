import db from "../db.Config.js"
import bcryptjs from "bcryptjs";
import {errorHandler} from "../utils/error.js"
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const signup = async(req,res ,next) =>{  // req is the data we get from the client side 
    const{username ,email,password} = req.body;
    const  hashedPassword = bcryptjs.hashSync(password,10);
    try {
        const newUser =await db.query("insert into users (username,email,password) values ($1,$2,$3) returning *",[username,email,hashedPassword]);
        res.status(201).json({message : "User created"});

    } catch (error) {                                           
        next(error);  //pass the error to the next middleware
    }
}

export const signin = async(req,res,next)=>{
    const {email , password} = req.body;
    try {
        const validuser = await db.query("select * from users where email =$1",[email]);
        if(validuser.rows.length ==0){
           return  next(errorHandler(401,'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password,validuser.rows[0].password);
        if(!validPassword) return next(errorHandler(401 ,"Wrong credentials"));
        const token = jwt.sign({id :validuser.rows[0].id} ,process.env.JWT_Secret);
        // const{password :hashedPassword ,...rest} = validuser.rows[0]; // if you dont to send password
        res.cookie('access_token', token ,{httpOnly :true}).status(200).json(validuser.rows[0]);

    } catch (error) {
        next(error)
    }
}

export const google = async(req,res,next) =>{
    const email = req.body.email;
    try {
        const user = await db.query("select * from users where email = $1",[email]);
        if(user.rows.length >0){
            const token = jwt.sign({id:user.rows[0].id},process.env.JWT_Secret);
            res.cookie('access_token',token ,{httpOnly:true}).status(200).json(user.rows[0]);
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser = await db.query("insert into users (username,email,password,profilepicture) values ($1,$2,$3,$4) returning *",[req.body.name.split(' ').join('').toLowerCase()+Math.floor(Math.random()*10000).toString(),
            req.body.email,hashedPassword,req.body.photo]);
            const token = jwt.sign({id: newUser.rows[0].id} , process.env.JWT_Secret);
            res.cookie('access_token' ,token ,{httpOnly:true}).status(200).json(newUser.rows[0]);;
        }
        
    } catch (error) {
        next(error)
    }
}
