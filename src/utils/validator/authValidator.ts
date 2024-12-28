const { check } = require('express-validator');
import validatorMiddleware from '../../middleware/validatorMiddleware';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const signupValidator = [
    check("name")
        .notEmpty()
        .withMessage("name is required")
        .isLength({ min: 3 })
        .withMessage("name must be at least 3 characters"),

    check("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("provide a valid email")
        .custom(async (value: string) => {
            const userDoc = await prisma.user.findUnique({
                where: { email: value }
            });
            if (userDoc) {
                throw new Error("Email already in use");
            }
            return true;
        }),

    check("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 characters"),

    check("phoneNumber")
        .notEmpty()
        .withMessage("phone number is required")
        .isNumeric()
        .withMessage("phone number must be a number")
        .isLength({ min: 11, max: 11 })
        .withMessage("phone number must be 11 digits"),

    check("NationalId")
        .notEmpty()
        .withMessage("NationalId is required")
        .isNumeric()
        .withMessage("NationalId must be a number")
        .isLength({ min: 14, max: 14 })
        .withMessage("NationalId must be 14 digits"),

    validatorMiddleware,
];

export const signinValidator = [
    check("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("provide a valid email"),

    check("password")
        .notEmpty()
        .withMessage("password is required"),

    validatorMiddleware,
];
