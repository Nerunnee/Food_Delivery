import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getFoods = async (req: Request, res: Response) => {
  try {
    const foods = await prisma.food.findMany();

    res.json({ foods });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "invalid inputs" });
  }
};
