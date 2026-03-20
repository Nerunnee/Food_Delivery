import express, { Application } from "express";
import usersRouter from "./router/users.router";
import categoriesRouter from "./router/categories.router";
import foodsRouter from "./router/foods.router";
import orderRouter from "./router/orders.router";

const app: Application = express();
const PORT = 3000;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/foods", foodsRouter);
app.use("/orders", orderRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
