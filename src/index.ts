import express, { Application, Request, Response } from "express";
import { prisma } from "./lib/prisma";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json({ users });
});

app.get("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findFirst({
    where: { id: Number(id) },
  });

  res.json({ user });
});

app.post("/users", async (req: Request, res: Response) => {
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
    res.send(error);
  }
});

app.put("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, password, age, phoneNumber, address, role } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        email,
        password,
        age,
        phoneNumber,
        address,
        role,
      },
    });

    res.json({ updatedUser });
  } catch (error) {
    res.send(error);
  }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedUser = await prisma.user.delete({ where: { id: Number(id) } });

  res.json({ message: "success", deletedUser });
});

app.get("/categories", async (req: Request, res: Response) => {
  const categories = await prisma.foodCategory.findMany({
    include: {
      foods: true,
    },
  });

  res.json({ categories });
});

app.get("/categories/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const categories = await prisma.foodCategory.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      foods: true,
    },
  });

  res.json({ categories });
});

app.post("/categories", async (req: Request, res: Response) => {
  const { name } = req.body;

  const newCategory = await prisma.foodCategory.create({ data: { name } });

  res.json({ newCategory });
});

app.put("/categories/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedCategory = await prisma.foodCategory.update({
    where: { id: Number(id) },
    data: { name },
  });

  res.json({ updatedCategory });
});

app.delete("/categories/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.foodCategory.delete({
      where: { id: Number(id) },
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "invalid inputs" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
