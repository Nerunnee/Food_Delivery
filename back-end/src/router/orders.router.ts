import express from "express";
import { getOrders } from "../controller/orders/get-orders";
import { getOrderById } from "../controller/orders/get-order-by-id";
import { addOrder } from "../controller/orders/add-order";
import { updatedOrder } from "../controller/orders/update-order";
import { deletedOrder } from "../controller/orders/delete-order";
import { getOrdersRole } from "../controller/orders/get-orders-role";

const router = express.Router();

router.get("/", getOrders);
router.get("/role", getOrdersRole);
router.get("/:id", getOrderById);
router.post("/", addOrder);
router.put("/:id", updatedOrder);
router.delete("/:id", deletedOrder);

export default router;
