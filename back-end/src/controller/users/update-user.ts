import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updatedUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, password, age, phoneNumber, address, role } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        email,
        password,
        age,
        phoneNumber,
        address,
        role,
      },
    });

    res.json({ updatedUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "invalid inputs" });
  }
};
