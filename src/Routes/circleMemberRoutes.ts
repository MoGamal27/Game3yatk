import { createCircleMember, getAvailablePayoutOrder } from "../Controllers/circleMemberController";
import { circleMemberValidator } from "../utils/validator/circleMemberValidator";
import { Router } from "express";
const router = Router();

router.post("/", circleMemberValidator ,createCircleMember);
router.get("/available-payout-order/:circleId", getAvailablePayoutOrder);

export default router;