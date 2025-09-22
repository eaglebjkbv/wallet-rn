import express from "express"
import { sql } from "../config/db.js";
import { getTransactionsByUserId, createTransaction ,getAllTransactions, deleteTRansactionById , summerizeTransactions} from "../controllers/transactionController.js"

const router= express.Router()

router.post("/api/transactions",createTransaction)
// Seçme işlemi
router.get("/:userId",getTransactionsByUserId)
// hepsini getir
router.get("/", getAllTransactions)
// Silme İşlemi
router.delete("/:id",deleteTRansactionById)
// Özet getirme (toplam)
router.get("/summary/:userId",summerizeTransactions)

export default router;
