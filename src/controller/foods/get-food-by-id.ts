import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getFoodById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const food = await prisma.food.findFirst({ where: { id: Number(id) } });

    res.json({ food });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "invalid inputs" });
  }
};
