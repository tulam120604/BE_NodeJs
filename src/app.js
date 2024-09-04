import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDB from './database.js';
import RoutesProducts from './src/Routes/Items/Products.js';
import RoutesCategories from './src/Routes/Items/Categories.js';
import RoutesAuth from './src/Routes/Auth/Auth.js';
import RoutesCart from './src/Routes/Cart/Cart.js';
import Routes_upload from './src/Routes/upload.js';
import Routes_Order from './src/Routes/Order/Order.js';
import Routes_Attribute from './src/Routes/Attribute/Attribute.js';
import RoutesFeedback from './src/Routes/Feedback/Feedback.js';
import RoutesNotification from './src/Routes/Notification/Notification.js';
// import { handle_socket_event } from './socket/handle_socket';
// import { createServer } from 'node:http'
// import { Server } from 'socket.io';
import RoutesAddress from './src/Routes/Auth/Address.js';
import Routes_Favorites from './src/Routes/Items/Favorites.js';
// import RoutesPayment from './Routes/Payment/Payment';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


ConnectDB(process.env.DB_MONGO);

// item
app.use('/v1', RoutesProducts);
app.use('/v1', RoutesCategories);

// attribute
app.use('/v1', Routes_Attribute)

// authen
app.use('/v1', RoutesAuth);
app.use('/v1', Routes_upload);

// cart
app.use('/v1', RoutesCart);

// order
app.use('/v1', Routes_Order);

// feedback
app.use('/v1', RoutesFeedback);

// notification
app.use('/v1', RoutesNotification)

// address 
app.use('/v1', RoutesAddress)

// favorite 
app.use('/v1', Routes_Favorites)

// payment
// app.use('/v1', RoutesPayment)


// web socket
// const server = createServer(app)
// const io = new Server(server, {
//     cors: {
//         origin: process.env.HOST_SOCKET,
//     }
// });

// handle_socket_event(io)

app.listen(process.env.PORT_SOCKET, () => {
    console.log('server running!');
})

export default app