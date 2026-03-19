import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const secretToken = process.env.NERUNNEEJWT;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const accessToken = jwt.sign(
        {
          data: { userId: user.id, email: user.email, role: user.role },
        },
        secretToken!,
        { expiresIn: "1h" },
      );

      res.status(200).json({ accessToken });
    } else {
      res.status(400).json({ message: "invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "invalid inputs" });
  }
};
