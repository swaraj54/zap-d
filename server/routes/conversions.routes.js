import { Router } from "express";
import { convert } from "../controllers/conversions.controllers.js";

const router = Router();

router.get('/convert', convert)


export default router;