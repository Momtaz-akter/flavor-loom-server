import { Router } from 'express';
import {
  createNewProduct,
  getAllProducts,
  getProductsByBrand,
  getProductById,
  updateProduct,
} from '../controllers/product-controllers.js';

const router = Router();

router.post('/', createNewProduct);
router.get('/', getProductsByBrand);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);

export default router;
