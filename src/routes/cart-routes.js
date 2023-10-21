import { Router } from 'express';
import { getCartByEmail, updateCart } from '../controllers/cart-controllers.js';

const router = Router();

router.get('/:email', getCartByEmail);
router.put('/:email', updateCart);

export default router;
