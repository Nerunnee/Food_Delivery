import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const order = await prisma.foodOrder.findFirst({
      where: { id: Number(id) },
      include: { foodOrderItems: true },
    });

    res.json({ order });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "invalid inputs" });
  }
};
