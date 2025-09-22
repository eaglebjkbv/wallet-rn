import express from "express"
import dotenv from "dotenv"
import { initDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js";

import transactionRoute from "./routes/transactionsRoute.js"
// https://youtu.be/vk13GJi4Vd0?si=bdOsaJmJG8ym8lTK
dotenv.config();
const app=express()
// Middeware
app.use(rateLimiter);
app.use(express.json())



const PORT=process.env.PORT;

// routes

app.use("/api/transactions/",transactionRoute)

// ilk çalıştırıldığınd tablo oluşturma işlemi
initDB().then(()=>{
    app.listen(PORT || 5001,()=> {
    console.log("Server çalışıyor bir bak ",PORT || 5001);
});
})