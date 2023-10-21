import { Router } from 'express';
import { getAllBrands } from '../controllers/brand-controllers.js';

const router = new Router();

router.get('/', getAllBrands);

export default router;
