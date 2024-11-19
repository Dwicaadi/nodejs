import express from "express";
import { 
    getOrders, 
    getOrderById, 
    createOrder, 
    updateOrder, 
    deleteOrder,
    getOrderHistory,
 
} from "../controllers/order.controllers.js";
import { authenticateToken, verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

//order history 
router.get('/history', authenticateToken, getOrderHistory);
//route untuk semua user
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post('/',authenticateToken, createOrder);
router.patch('/:id', verifyAdmin, updateOrder);
router.delete('/:id', authenticateToken, deleteOrder);


export default router;
