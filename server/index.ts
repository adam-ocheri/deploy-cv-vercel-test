import express, { json } from 'express';
import { connectDB } from './resume/config/db';
// import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import resumeRoute from './resume/routes/resumeRoute';
import linkedinRoutes from './auth/routes/linkdeinRoute';
import authRoutes from './auth/routes/authRoutes';
import profileRoutes from './profile/routes/profileRoute';
import coverLetterRoutes from './coverLetters/routes/coverLetterRoute';
import applicationsRoutes from './applications/routes/applicationsRoutes';
import interviewRoutes from './interview/routes/interviewRoutes';
// import ceeveeItRoutes from './profile/routes/ceeveeItRoute'; !

//PASSPORT
import passport from 'passport';
import session from 'express-session';
// Passport config
import './resume/config/passportStrategies';

dotenv.config({ path: './.env' });
const PORT = process.env.PORT || 4000;

connectDB();

const app = express();

console.log('APP');

app.use(cors())
    .use(json())
    .use(
        session({
            secret: process.env.SESSION_SECRET as string,
            resave: false,
            saveUninitialized: false,
        })
    )
    .use(passport.initialize())
    .use(passport.session());

app.use('/auth', linkedinRoutes);
app.use('/api', resumeRoute);
app.use('/api/auth', authRoutes);

app.use('/api/', profileRoutes);
app.use('/api/', coverLetterRoutes);
app.use('/api/', applicationsRoutes);
app.use('/interviews', interviewRoutes);

app.get('/', (req, res) => {
    res.send('Hello from App Engine!');
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-undef, no-console
    console.log(`Server is running on port ${PORT}`);
});
