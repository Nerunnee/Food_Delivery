import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export type OrderItem = {
  foodId: number;
  quantity: number;
};

export const addOrder = async (req: Request, res: Response) => {
  const { orderItems }: { orderItems: OrderItem[] } = req.body;

  const totalPrice = await calcFoodTotalPrice(
    orderItems.map((order) => order.foodId),
  );

  const order = await prisma.foodOrder.create({
    data: {
      totalPrice: totalPrice.toString(),
      status: "PENDING",
      foodOrderItems: {
        createMany: {
          data: orderItems,
        },
      },
    },
  });

  res.json(order);
};

const calcFoodTotalPrice = async (foodIds: number[]) => {
  const foods = await prisma.food.findMany({
    where: {
      id: {
        in: foodIds,
      },
    },
    select: {
      price: true,
    },
  });

  const totalPrice = foods.reduce((a, b) => Number(a) + Number(b.price), 0);

  return totalPrice;
};
