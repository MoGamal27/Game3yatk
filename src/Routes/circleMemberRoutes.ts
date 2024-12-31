import { createCircleMember } from "../Controllers/circleMemberController";
import { circleMemberValidator } from "../utils/validator/circleMemberValidator";
import { Router } from "express";
const router = Router();

router.post("/", circleMemberValidator ,createCircleMember);

export default router;