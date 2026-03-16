import express from "express";
import { getCategories } from "../controller/category/get-categories";
import { getCategoryById } from "../controller/category/get-category-by-id";
import { addCategory } from "../controller/category/add-category";
import { updateCategory } from "../controller/category/update-category";
import { deletedCategory } from "../controller/category/delete-category";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", addCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deletedCategory);

export default router;
