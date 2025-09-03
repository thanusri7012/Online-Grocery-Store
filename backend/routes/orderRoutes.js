import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
} from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders); // Add this route
router.route('/:id').get(protect, getOrderById); // Add this route

export default router;