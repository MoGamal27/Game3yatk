import { NextFunction, Request, Response } from "express";
import asyncHanler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/appError";

const prisma = new PrismaClient();


const createCircleMember = asyncHanler(async (req: Request, res: Response, next: NextFunction) => {
  const { circleId, userId, payoutOrder } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return next(new AppError("User not found", 404));
  } 

  const circle = await prisma.circle.findUnique({
    where: { id: circleId },
    include: { circleMembers: true },
  });

  if (!circle) {
    return next(new AppError("Circle not found", 404));
  }

  if(circle.circleMembers.length >= circle.totalMember) {
    return next(new AppError("Circle is full", 400));
  }

  const existingOrder = await prisma.circleMember.findFirst({
    where: { circleId, payoutOrder },
  });

  if (existingOrder) {
    return next(new AppError("Payout order already taken", 400));
  }

  const newCircleMember = await prisma.circleMember.create({
    data: {
      circleId,
      userId,
      payoutOrder,
    },
  });

  res.status(201).json({
    status: "success",
    data: {
        newCircleMember,
    },
  });
});


const getAvailablePayoutOrder = asyncHanler(async (req: Request, res: Response, next: NextFunction) => {
  const  circleId  = parseInt(req.params.circleId);

  const circle = await prisma.circle.findUnique({
    where: { id: circleId },
    select: { 
      totalMember: true,
      circleMembers: {
        select: {
          payoutOrder: true,
        },
      }
    },
  });

  if(!circle) {
    return next(new AppError("Circle not found", 404));
  }
  const takenOrder = new Set(circle.circleMembers.map((member) => member.payoutOrder));

  const availableOrder = Array.from({ length: circle.totalMember }, 
    (_, i) => i + 1)
    .filter((order) => !takenOrder.has(order));

    res.status(200).json({
      status: "success",
      data: {
        availableOrder,
      },
    });

});


export {
  createCircleMember,
  getAvailablePayoutOrder,
};
