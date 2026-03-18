import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export type OrderItem = {
  foodId: number;
  quantity: number;
};

export const addOrder = async (req: Request, res: Response) => {
  const { userId, orderItems }: { orderItems: OrderItem[]; userId: number } =
    req.body;

  const totalPrice = await calcFoodTotalPrice(orderItems);

  const order = await prisma.foodOrder.create({
    data: {
      userId: userId,
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

const calcFoodTotalPrice = async (orderItems: OrderItem[]) => {
  const foodIds = orderItems.map((orderItem) => orderItem.foodId);

  const foodsPrice = await prisma.food.findMany({
    where: {
      id: {
        in: foodIds,
      },
    },
    select: {
      id: true,
      price: true,
    },
  });

  const priceMap = new Map(
    foodsPrice.map((food) => [food.id, Number(food.price)]),
  );

  const totalPrice = orderItems.reduce((sum, item) => {
    const unitPrice = priceMap.get(item.foodId) ?? 0;
    return sum + unitPrice * item.quantity;
  }, 0);

  return totalPrice;
};
