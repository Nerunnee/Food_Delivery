import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const deletedOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.$transaction(async (order) => {
      await order.foodOrderItem.deleteMany({
        where: { foodOrderId: Number(id) },
      });

      await order.foodOrder.delete({
        where: { id: Number(id) },
      });
    });

    return res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "invalid inputs" });
  }
};
