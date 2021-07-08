import { Router } from 'express';

import auth from './auth';
import products from './products';

const router = new Router();

router.use('/auth', auth);
router.use('/products', products);

export default router;
