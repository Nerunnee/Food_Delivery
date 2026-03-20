import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const addFood = async (req: Request, res: Response) => {
  const { foodName, price, image, ingredients, foodCategoryId } = req.body;

  try {
    const newfood = await prisma.food.create({
      data: { foodName, price, image, ingredients, foodCategoryId },
    });

    res.json({ newfood });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "invalid inputs" });
  }
};
