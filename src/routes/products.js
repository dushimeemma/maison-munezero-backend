import { Router } from 'express';

import Product from '../controllers/products';
import asyncHandler from '../middlewares/errors/async_handler';
import Auth from '../middlewares/auth/auth';
import {
  ProductSchema,
  UpdateProductSchema,
} from '../middlewares/validations/product';

const router = Router();
const product = new Product();
const auth = new Auth();

router
  .post(
    '/create',
    auth.verifyToken,
    ProductSchema,
    asyncHandler(product.create)
  )
  .get('/', asyncHandler(product.getAll))
  .get('/:id', asyncHandler(product.getOne))
  .put(
    '/update/:id',
    auth.verifyToken,
    UpdateProductSchema,
    asyncHandler(product.update)
  )
  .delete('/delete/:id', auth.verifyToken, asyncHandler(product.delete));

export default router;
