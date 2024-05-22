import {Router} from 'express';
import { Sign_in, Sign_up } from '../Controllers/User';

const AuthRouter = Router();

AuthRouter.post('/signup', Sign_up);
AuthRouter.post('/signin', Sign_in);

export default AuthRouter