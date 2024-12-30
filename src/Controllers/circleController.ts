import { NextFunction, Request, Response } from "express";
import asyncHanler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/appError";

const prisma = new PrismaClient();


const createCircle = asyncHanler(async (req: Request, res: Response, next:NextFunction) => {
    const { totalMember, amount, adminFees, duration } = req.body;

    if(totalMember !== duration) {
        return next(new AppError("Total member must be equal to duration", 400));
    }

    const circle = await prisma.circle.create({
        data: {
          totalMember,
          amount,
          adminFees,
          duration,
          installment: amount / duration,
          totalPayout: amount,
          payoutDate: new Date(new Date().setMonth(new Date().getMonth() + duration)),
        },
      });

      res.status(201).json({
        status: "success",
        data: {
            circle,
        },
      });

    })   


    export { createCircle };