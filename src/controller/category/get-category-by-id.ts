import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const categories = await prisma.foodCategory.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        foods: true,
      },
    });

    res.json({ categories });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "invalid inputs" });
  }
};
