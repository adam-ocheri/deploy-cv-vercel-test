// import passport from 'passport';
// // import LinkedInStrategy from 'passport-linkedin-oauth2';
// // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
// import LinkedInStrategy from 'passport-linkedin-oauth2';
// import dotenv from 'dotenv';
// dotenv.config({ path: './.env' });
// import process = require('process');
// import CeeveeUsers, { ICeeveeUser } from '../../auth/models/ceeveeUsers';
// import jwt from 'jsonwebtoken';
// import { Profile } from 'passport';

// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// interface LinkedInProfile extends Profile {
//     emails: Array<{ value: string }>;
// }

// interface IAuth {
//     user: ICeeveeUser;
//     token: string;
// }

// const verifyFunction = async (
//     accessToken: string,
//     refreshToken: string,
//     profile: LinkedInProfile,
//     // eslint-disable-next-line no-unused-vars
//     done: (error: Error | unknown | null, data?: IAuth, info?: { message: string }) => void
// ) => {
//     try {
//         let user = await CeeveeUsers.findOne({ linkedInId: profile.id });

//         if (!user) {
//             const { value } = profile.emails && profile.emails[0];

//             user = new CeeveeUsers({
//                 linkedInId: profile.id,
//                 displayName: profile.displayName,
//                 email: value,
//             });

//             await user.save();
//         }

//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

//         return done(null, { user, token });
//     } catch (error) {
//         return done(error);
//     }
// };

// passport.use(
//     new LinkedInStrategy.Strategy(
//         {
//             clientID: process.env.LINKEDIN_CLIENT_ID as string,
//             clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
//             callbackURL: process.env.LINKEDIN_REDIRECT_URI as string,
//             scope: ['r_emailaddress', 'r_liteprofile'],
//         },
//         verifyFunction
//     )
// );

// passport.deserializeUser((user: ICeeveeUser, done) => done(null, user));
