import { Router } from 'express';

import Auth from '../controllers/auth';
import { SignupSchema, LoginSchema } from '../middlewares/validations/auth';
import asyncHandler from '../middlewares/errors/async_handler';

const auth = new Auth();
const router = Router();

router
  .post('/signup', SignupSchema, asyncHandler(auth.signup))
  .post('/login', LoginSchema, asyncHandler(auth.login));

export default router;
