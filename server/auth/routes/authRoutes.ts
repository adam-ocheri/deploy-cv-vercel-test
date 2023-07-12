import { Router } from 'express';
import {
    addUser,
    forgotPassword,
    loginUser,
    resetPassword,
    updatePassword,
    getUserDataController,
    updateUsername,
} from '../controllers/userController';

const router = Router();

router.route('/register').post(addUser);

router.route('/login').post(loginUser);

router.route('/forgotPassword').post(forgotPassword);

router.route(`/resetPassword`).patch(resetPassword);

router.route('/updatePassword').patch(updatePassword);

router.route('/updateUsername').patch(updateUsername);

router.route('/me').get(getUserDataController);

export default router;
