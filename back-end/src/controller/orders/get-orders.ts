import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getOrders = async (req: Request, res: Response) => {
  
  try {
    const orders = await prisma.foodOrder.findMany({
      include: { foodOrderItems: true },
    });

    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "invalid inputs" });
  }
};
