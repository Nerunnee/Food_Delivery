import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const addUser = async (req: Request, res: Response) => {
  const { email, password, age, phoneNumber, address, role } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        age,
        phoneNumber,
        address,
        role,
      },
    });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "invalid inputs" });
  }
};
