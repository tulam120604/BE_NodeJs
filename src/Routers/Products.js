import {Router} from 'express';
import { createProduct, editProduct, getAllProducts, getDeitalProduct, removeProduct } from '../Controllers/Products';
import { checkPremisionAuth } from '../middlewares/Auth';

const routerProducts = Router();

routerProducts.get('/', getAllProducts);
routerProducts.get('/:id', getDeitalProduct);
routerProducts.post('/', checkPremisionAuth , createProduct);
routerProducts.delete('/:id', checkPremisionAuth , removeProduct);
routerProducts.put('/:id', checkPremisionAuth , editProduct);

export default routerProducts;