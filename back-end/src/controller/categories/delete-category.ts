import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const deletedCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.foodCategory.delete({
      where: { id: Number(id) },
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "invalid inputs" });
  }
};
