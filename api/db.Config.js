import pg from "pg";
import dotenv from 'dotenv';
dotenv.config();

const db = new pg.Client({
    user : process.env.dbUser,
    password:process.env.dbPassword,
    database:process.env.dbDatabase,
    host:process.env.dbHost,
    port:process.env.dbPort
});


export default db;