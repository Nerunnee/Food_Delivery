import express from "express";
import { getUsers } from "../controller/users/get-users";
import { getUserById } from "../controller/users/get-user-by-id";
import { addUser } from "../controller/users/add-user";
import { updatedUser } from "../controller/users/update-user";
import { deletedUser } from "../controller/users/delete-user";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", updatedUser);
router.delete("/:id", deletedUser);

export default router;
