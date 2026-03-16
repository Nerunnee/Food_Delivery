import express, { Application, Request, Response } from "express";
import { prisma } from "./lib/prisma";
import usersRouter from "./router/users.router";
import categoriesRouter from "./router/category.router";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);

// app.get("/foods", async (req: Request, res: Response) => {
//   try {
//     const foods = await prisma.food.findMany();

//     res.json({ foods });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: "invalid inputs" });
//   }
// });

// app.get("/foods/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const food = await prisma.food.findFirst({ where: { id: Number(id) } });

//     res.json({ food });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: "invalid inputs" });
//   }
// });

// app.post("/foods", async (req: Request, res: Response) => {
//   const { foodName, price, image, ingredients, foodCategoryId } = req.body;

//   try {
//     const newfood = await prisma.food.create({
//       data: { foodName, price, image, ingredients, foodCategoryId },
//     });

//     res.json({ newfood });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: "invalid inputs" });
//   }
// });

// app.put("/foods/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { foodName, price, image, ingredients, foodCategoryId } = req.body;

//   try {
//     const updatedfood = await prisma.food.update({
//       where: { id: Number(id) },
//       data: { foodName, price, image, ingredients, foodCategoryId },
//     });

//     res.json({ updatedfood });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: "invalid inputs" });
//   }
// });

// app.delete("/foods/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     await prisma.food.delete({
//       where: { id: Number(id) },
//     });

//     res.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: "invalid inputs" });
//   }
// });

// app.get("/orders", async (req: Request, res: Response) => {
//   try {
//     const orders = await prisma.foodOrder.findMany({
//       include: { foodOrderItems: true },
//     });

//     res.json({ orders });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: "invalid inputs" });
//   }
// });

// app.get("/orders/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const order = await prisma.foodOrder.findFirst({
//       where: { id: Number(id) },
//       include: { foodOrderItems: true },
//     });

//     res.json({ order });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: "invalid inputs" });
//   }
// });

// export type OrderItem = {
//   foodId: number;
//   quantity: number;
// };

// app.post("/orders", async (req: Request, res: Response) => {
//   const { orderItems }: { orderItems: OrderItem[] } = req.body;

//   const totalPrice = await calcFoodTotalPrice(
//     orderItems.map((order) => order.foodId),
//   );

//   const order = await prisma.foodOrder.create({
//     data: {
//       totalPrice: totalPrice.toString(),
//       status: "PENDING",
//       foodOrderItems: {
//         createMany: {
//           data: orderItems,
//         },
//       },
//     },
//   });

//   res.json(order);
// });

// const calcFoodTotalPrice = async (foodIds: number[]) => {
//   const foods = await prisma.food.findMany({
//     where: {
//       id: {
//         in: foodIds,
//       },
//     },
//     select: {
//       price: true,
//     },
//   });

//   const totalPrice = foods.reduce((a, b) => Number(a) + Number(b.price), 0);

//   return totalPrice;
// };

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
