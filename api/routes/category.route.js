import express from 'express';
import Validate from '../validation';
import CategoryController from '../controller/category.controller';
import UserMiddleware from '../middleware/user.middleware';
import CategoryMiddleware from '../middleware/category.middleware';

const router = express.Router();

router.get('/', CategoryController.getAll);

router.post('/',
  UserMiddleware.verifyToken,
  UserMiddleware.checkRole,
  Validate.category,
  CategoryMiddleware.checkExist,
  CategoryController.create);

router.post('/seller',
  UserMiddleware.verifyToken,
  UserMiddleware.checkSellerRole,
  Validate.category,
  CategoryMiddleware.sellerCheckExist,
  CategoryController.sellerCreate);

export default router;
