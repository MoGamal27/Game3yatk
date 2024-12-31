import { Router } from "express";
import  authRoutes  from "./authRoutes";
import circleRoutes from "./circleRoutes";
import circleMemberRoutes from "./circleMemberRoutes";
const router = Router();

router.use("/auth", authRoutes);
router.use("/circle", circleRoutes);
router.use("/circleMember", circleMemberRoutes);

export default router;
