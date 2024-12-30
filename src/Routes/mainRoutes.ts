import { Router } from "express";
import  authRoutes  from "./authRoutes";
import circleRoutes from "./circleRoutes";
const router = Router();

router.use("/auth", authRoutes);
router.use("/circle", circleRoutes);

export default router;
