import express from 'express';
const router = express.Router();
import {
  getUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { admin } from '../middlewares/adminMiddleware.js';

// User route
router.route('/profile').get(protect, getUserProfile);

// Admin routes
router.route('/').get(protect, admin, getUsers);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;