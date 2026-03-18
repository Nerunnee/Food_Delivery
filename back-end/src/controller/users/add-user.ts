import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

export const addUser = async (req: Request, res: Response) => {
  const { email, password, age, phoneNumber, address, role } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  console.log("fsvfd", hashPassword);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
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
