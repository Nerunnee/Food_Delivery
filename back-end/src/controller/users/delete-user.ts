import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const deletedUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await prisma.user.delete({ where: { id: Number(id) } });

    res.json({ message: "success", deletedUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "invalid inputs" });
  }
};
