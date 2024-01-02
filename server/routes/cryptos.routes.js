import { Router } from "express";
import { getCryptos, getSupportedCurrencies } from "../controllers/cryptos.controllers.js";

const router = Router();

router.get('/get-cryptos', getCryptos)
router.get('/get-currencies', getSupportedCurrencies)


export default router;