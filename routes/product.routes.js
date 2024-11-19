import express from "express";
import { 
    getProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} from "../controllers/product.controllers.js";
import { authenticateToken, verifyAdmin } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Route yang bisa diakses member,admin,guest
router.get("/", authenticateToken, getProducts);

// Route yang hanya bisa diakses admin
router.post("/", verifyAdmin, upload.single('image'), createProduct);
router.put("/:id", verifyAdmin, upload.single('image'), updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);

export default router;
