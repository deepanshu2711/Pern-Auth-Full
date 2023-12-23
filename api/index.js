import express from "express";
import userRoutes from "./routes/user_route.js";
import authRoutes from "./routes/auth_route.js";



const app = express();
const port =3000;

app.use(express.json()); //parse incomming json data into java script object

app.listen(port ,()=>{
    console.log("server listening to port 3000...");
});


app.use("/api/user" ,userRoutes);
app.use("/api/auth" , authRoutes);