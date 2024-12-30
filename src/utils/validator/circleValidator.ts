const { check } = require('express-validator');
import validatorMiddleware from '../../middleware/validatorMiddleware';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const circleValidator = [
    check("totalMember")
       .notEmpty()
       .withMessage("Total member is required")
       .isInt()
       .withMessage("Total member must be number"),

    check("amount")
       .notEmpty()
       .withMessage("Amount is required")
       .isInt({ min: 3000, max: 120000 })
       .withMessage("Amount must be between 3000 and 120000"),

    check("adminFees")
       .notEmpty()
       .withMessage("Admin fees is required")
       .isInt()
       .withMessage("Admin fees must be a number"),
    
    
    check("duration")
       .notEmpty()
       .withMessage("Duration is required")
       .isInt({ min: 1, max: 12 })
       .withMessage("Duration must be between 1 and 12"),

     validatorMiddleware,  
]