import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updatedFood = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { foodName, price, image, ingredients, foodCategoryId } = req.body;

  try {
    const updatedfood = await prisma.food.update({
      where: { id: Number(id) },
      data: { foodName, price, image, ingredients, foodCategoryId },
    });

    res.json({ updatedfood });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "invalid inputs" });
  }
};
