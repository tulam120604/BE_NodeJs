import express from 'express';
import {
    get_Detail_Client, get_Detail_Dashboard, get_item_by_category,
    get_item_by_user, get_Item_Client, get_Item_Dashboard, search_Item
} from '../../Controllers/Products/Get.js';
import { Create_Product } from '../../Controllers/Products/Create.js';
import { middleWare } from '../../middleware/Auth.js';
import upload from '../../middleware/multer.js';
import { Soft_remove } from '../../Controllers/Products/Soft_delere.js';
import { destroy_items, get_recycle_items, restore_item } from '../../Controllers/Recycle/Items.js';
import { edit_Product } from '../../Controllers/Products/Edit.js';

const RoutesProducts = express.Router();

RoutesProducts.get('/products/admin', middleWare, get_Item_Dashboard);
RoutesProducts.get('/products', get_Item_Client);
RoutesProducts.get('/products/search', search_Item);
RoutesProducts.get('/products/category/:category_id', get_item_by_category);
RoutesProducts.get('/products/:id', get_Detail_Client);
RoutesProducts.get('/products/dashboard/:id', get_Detail_Dashboard);
RoutesProducts.post('/products', upload.array('gallery'), middleWare, Create_Product);
RoutesProducts.delete('/products/:id', middleWare, Soft_remove);
RoutesProducts.delete('/products/destroy_item/:id', middleWare, destroy_items);
RoutesProducts.put('/products/admin/:id', upload.array('gallery'), middleWare, edit_Product);
RoutesProducts.get('/products/admin/trash', middleWare, get_recycle_items);
RoutesProducts.patch('/products/admin/trash/:id', middleWare, restore_item);
RoutesProducts.get('/products/sellers/:id_user', get_item_by_user)


export default RoutesProducts;