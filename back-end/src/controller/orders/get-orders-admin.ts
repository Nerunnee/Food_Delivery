import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";

type Token = {
  data: {
    userId: number;
    email: string;
    role: string;
  };
};

export const getOrdersAdmin = async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  const accessToken = authorization?.split(" ")[1];

  if (!accessToken) return res.send("not found");

  const secretToken = process.env.NERUNNEEJWT!;

  try {
    const decoded = jwt.verify(accessToken, secretToken) as Token;

    if (decoded.data.role !== "ADMIN") {
      return res.status(400).json({ message: "invalid" });
    }

    const orders = await prisma.foodOrder.findMany({
      include: {
        foodOrderItems: true,
      },
    });

    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.send(error);
    res.status(400).json({ message: "invalid inputs" });
  }
};
