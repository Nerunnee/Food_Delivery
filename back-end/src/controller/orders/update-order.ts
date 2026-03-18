import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updatedOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await prisma.foodOrder.update({
      where: { id: Number(id) },
      data: {
        status,
      },
    });

    res.json({ updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "invalid inputs" });
  }
};
