const { check } = require('express-validator');
import validatorMiddleware from '../../middleware/validatorMiddleware';



export const circleMemberValidator = [
    check("circleId")
       .notEmpty()
       .withMessage("Circle ID is required")
       .isInt()
       .withMessage("Circle ID must be a number"),

       check("userId")
       .notEmpty()
       .withMessage("User ID is required")
       .isInt()
       .withMessage("User ID must be a number"),

       check("payoutOrder")
       .notEmpty()
       .withMessage("Payout order is required")
       .isInt()
       .withMessage("Payout order must be a number"),

       validatorMiddleware,

]

