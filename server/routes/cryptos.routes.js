import { Router } from "express";
import { getCryptos } from "../controllers/cryptos.controllers.js";

const router = Router();

router.get('/get-cryptos', getCryptos)


export default router;