import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { AppError } from "../utils/appError";



const prisma = new PrismaClient();

const signUp = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  
    const { name, email, password, phoneNumber, NationalId } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

    const user  = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            NationalId,
        },
    });

    res.status(201).json({
        status: "success",
        data: {
            user,
        },
    });
    next();
    });

    const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
       

       const user = await prisma.user.findUnique({
            where: {
               email: req.body.email
            },
        });

        if(!user ||  !(await bcrypt.compare(req.body.password, user.password))) {
            return next(new AppError("Incorrect email or password", 401));
        }

        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
        next();
    });
        
    export { 
        signUp, 
        login 
    };