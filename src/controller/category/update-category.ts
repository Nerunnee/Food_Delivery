import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedCategory = await prisma.foodCategory.update({
      where: { id: Number(id) },
      data: { name },
    });

    res.json({ updatedCategory });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "invalid inputs" });
  }
};
