import jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const  verifyToken =(req,res ,next) =>{
    const token =req.cookies.access_token;

    if(!token){
        return res.status(401).json({message : 'Unauthorized user'});
    }
    jwt.verify(token,process.env.JWT_Secret,(err ,user) =>{
        if(err) return res.status(403).json({message : 'Unauthorized user'});
        req.user = user;
        
    })
    next();
}