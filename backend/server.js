import express from "express"
import dotenv from "dotenv"
import { sql } from "./config/db.js"
// https://youtu.be/vk13GJi4Vd0?si=bdOsaJmJG8ym8lTK
dotenv.config();
const app=express()
// Middeware
app.use(express.json())

const PORT=process.env.PORT;

// ilk çalıştırıldığınd tablo oluşturma işlemi
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
// Ekleme İşlemi
app.post("/api/transactions",async (req,res)=>{
    // title, amount,category,user_id
    try {
        const {title,amount,category,user_id}=req.body;
        if(!title || !user_id || !category || amount===undefined){
            return res.status(400).json({message:"All fields are required"})
        }
        const transaction=await sql`INSERT INTO transactions(user_id,title,amount,category)
        VALUES(${user_id},${title},${amount},${category}) RETURNING * `
        console.log(transaction)
        res.status(201).json(transaction[0])
    } catch (error) {
        console.log("Error on creating transaction",error);
        res.status(500).json({message:"Internal server eroor"})
    }
})
// Seçme işlemi
app.get("/api/transactions/:userId",async(req,res)=>{
    try {
        const {userId}=req.params
        await console.log("User id ",userId)
        const transactions=await sql`SELECT * FROM transactions WHERE user_id=${userId} ORDER BY created_at`
        res.status(200).json(transactions);
    } catch (error) {
         console.log("Error on getting transaction",error);
        res.status(500).json({message:"Internal server eroor"})
    }
})
// Silme İşlemi
app.delete("/api/transactions/:id",async (req,res)=>{
    try {
        const {id}=req.params
        const result=await sql `DELETE FROM transactions WHERE id=${id} RETURNING *`;
        if(result.length==0){
                res.status(404).json({messag:"Transaction not found"});
        }else{
                res.status(200).json({messag:"Transaction deleted"});

        }
        
    } catch (error) {
        console.log("Error on deleting transaction",error);
        res.status(500).json({message:"Internal server eroor"})
    }
})



initDB().then(()=>{
    app.listen(PORT || 5001,()=> {
    console.log("Server çalışıyor bir bak ",PORT || 5001);
});
})