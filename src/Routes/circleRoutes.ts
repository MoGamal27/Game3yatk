import { createCircle } from "../Controllers/circleController";
import { circleValidator } from "../utils/validator/circleValidator";
const router = require("express").Router();

router.post("/", circleValidator, createCircle);

export default router;