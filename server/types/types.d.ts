import express from 'express';
import 'express-session';

declare module 'express-session' {
    interface SessionData {
        state: string;
    }
}

declare module 'express-serve-static-core' {
    interface Request {
        session: express.Session;
    }
}
