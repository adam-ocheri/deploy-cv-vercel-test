import { Router, Request, Response } from 'express';
import { Session } from 'express-session';
import crypto from 'crypto';
// import { linkedinAuthController, handleAuthCallbackController } from '../controllers/linkedinController';
import { logoutController } from '../controllers/logoutController';
import passport from 'passport';

const router = Router();

interface ExtendedSession extends Session {
    state?: string;
}

// router.get('/linkedin', linkedinAuthController.handleAuthRequest);
router.get(
    '/linkedin',
    (req, res, next) => {
        (req.session as ExtendedSession).state = crypto.randomBytes(16).toString('hex'); // generate a new state for each session
        passport.authenticate('linkedin', { state: (req.session as ExtendedSession).state })(req, res, next);
    },
    (req, res) => {
        // The request will be redirected to LinkedIn for authentication, so this
        // function will not be called.
        console.log('linkedin', { req, res });
    }
);

// Callback route after login with linkedin
router.get(
    '/linkedin/callback',
    passport.authenticate(
        'linkedin',
        {
            failureRedirect: process.env.CLIENT_URI,
            // successRedirect: `${process.env.CLIENT_URI}/createResume`,
        },
        (req: Request, res: Response) => {
            // res.cookie('token', req.user.token, { httpOnly: true, sameSite: 'Strict' });
            res.redirect(`${process.env.CLIENT_URI}/createResume`);
        }
    )
);

// router.get('/linkedin/callback', handleAuthCallbackController.handleAuthCallback);
// Logout
router.post('/logout', logoutController.logout);

export default router;
