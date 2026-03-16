import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const addCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const newCategory = await prisma.foodCategory.create({ data: { name } });

    res.json({ newCategory });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "invalid inputs" });
  }
};
