import express from "express";
import { getOrders } from "../controller/orders/get-orders";
import { getOrderById } from "../controller/orders/get-order-by-id";
import { addOrder } from "../controller/orders/add-order";
import { deletedOrder } from "../controller/orders/delete-order";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", addOrder);
router.delete("/:id", deletedOrder);

export default router;
