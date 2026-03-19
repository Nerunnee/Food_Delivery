import express from "express";
import { getOrders } from "../controller/orders/get-orders";
import { getOrderById } from "../controller/orders/get-order-by-id";
import { addOrder } from "../controller/orders/add-order";
import { updatedOrder } from "../controller/orders/update-order";
import { deletedOrder } from "../controller/orders/delete-order";
import { getOrdersUser } from "../controller/orders/get-orders-user";
import { getOrdersAdmin } from "../controller/orders/get-orders-admin";

const router = express.Router();

router.get("/", getOrders);
router.get("/user", getOrdersUser);
router.get("/admin", getOrdersAdmin);
router.get("/:id", getOrderById);
router.post("/", addOrder);
router.put("/:id", updatedOrder);
router.delete("/:id", deletedOrder);

export default router;
