import express from 'express';
import { create_favorite, list_favorites, remove_favorite } from '../../Controllers/Favorites/Favorites.js';

const Routes_Favorites = express.Router();

Routes_Favorites.get('/list_item_favorite/:id_user', list_favorites);
Routes_Favorites.post('/add_item_favorite', create_favorite);
Routes_Favorites.post('/remove_item_favorite/:id_user', remove_favorite);

export default Routes_Favorites