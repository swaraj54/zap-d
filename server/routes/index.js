import { Router } from "express";
import cryptosRoutes from './cryptos.routes.js';
import conversionsRoutes from './conversions.routes.js';

const router = Router();

router.use("/cryptos", cryptosRoutes);
router.use("/conversions", conversionsRoutes);

export default router;