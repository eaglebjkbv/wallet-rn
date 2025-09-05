import express from "express"
import dotenv from "dotenv"
import {sql} from "./config/db.js"
// https://youtu.be/vk13GJi4Vd0?si=bdOsaJmJG8ym8lTK
dotenv.config();
const app=express()
const PORT=process.env.PORT;
async function initDB() {
    try{
        await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`
        console.log("Database başarı ile oluşturuldu");
    } catch(error) {
        console.log("Database oluşturma hatası",error);
        
    }
}
app.get("/",(req,res)=>{
    res.send("Çalışıyor")
});



initDB().then(()=>{
    app.listen(PORT || 5001,()=> {
    console.log("Server çalışıyor bir bak ",PORT || 5001);
});
})