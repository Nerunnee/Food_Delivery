import express, { Application} from "express";
import usersRouter from "./router/users.router";
import categoriesRouter from "./router/categories.router";
import foodsRouter from "./router/foods.router";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/foods", foodsRouter);

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
