// import { Request, Response } from 'express';
// import axios from 'axios';
// import qs from 'qs';
// import jwt from 'jsonwebtoken';
// import { URL } from 'url';
// import dotenv from 'dotenv';

// dotenv.config({ path: './.env' });

// const { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, LINKEDIN_REDIRECT_URI } = process.env;

// export const generateCeeveeAccessToken = (ceevee_id: string): string => {
//     const payload = {
//         ceevee_id: ceevee_id,
//     };
//     const ceevee_accesstoken = jwt.sign(payload, 'SECRETKEY', {
//         expiresIn: '1h',
//     });
//     return ceevee_accesstoken;
// };

// export const linkedinAuthController = {
//     async handleAuthRequest(req: Request, res: Response): Promise<void> {
//         const linkedinAuthUrl = new URL(`https://www.linkedin.com/oauth/v2/authorization`);

//         linkedinAuthUrl.searchParams.append('response_type', 'code');
//         linkedinAuthUrl.searchParams.append('client_id', LINKEDIN_CLIENT_ID as string);
//         linkedinAuthUrl.searchParams.append('redirect_uri', LINKEDIN_REDIRECT_URI as string);
//         linkedinAuthUrl.searchParams.append('scope', 'r_liteprofile r_emailaddress');

//         res.redirect(linkedinAuthUrl.href);
//     },
// };

// export const handleAuthCallbackController = {
//     async handleAuthCallback(req: Request, res: Response): Promise<void> {
//         const { code } = req.query;

//         try {
//             const response = await axios.post(
//                 'https://www.linkedin.com/oauth/v2/accessToken',
//                 qs.stringify({
//                     grant_type: 'authorization_code',
//                     code: code,
//                     redirect_uri: LINKEDIN_REDIRECT_URI,
//                     client_id: LINKEDIN_CLIENT_ID,
//                     client_secret: LINKEDIN_CLIENT_SECRET,
//                     scope: 'r_basicprofile, r_emailaddress',
//                 }),
//                 {
//                     headers: {
//                         'Content-Type': 'application/x-www-form-urlencoded',
//                     },
//                 }
//             );

//             const { access_token } = response.data;

//             const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
//                 headers: {
//                     Authorization: `Bearer ${access_token}`,
//                     'cache-control': 'no-cache',
//                     'X-Restli-Protocol-Version': '2.0.0',
//                 },
//             });

//             const { id, firstName, lastName } = profileResponse.data;

//             const responseUser = await axios.get(
//                 `https://api.linkedin.com/v2/me?projection=(profilePicture(displayImage~:playableStreams))`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${access_token}`,
//                     },
//                 }
//             );

//             const profilePicUrl =
//                 responseUser.data.profilePicture['displayImage~'].elements[0].identifiers[0].identifier;

//             const url = new URL('http://localhost:3001/auth/linkedin/callback');

//             url.searchParams.append('token', access_token);
//             url.searchParams.append('id', id);
//             url.searchParams.append('firstName', firstName.localized.en_US);
//             url.searchParams.append('lastName', lastName.localized.en_US);
//             url.searchParams.append('profilePicUrl', profilePicUrl);

//             res.redirect(url.href);
//         } catch (error) {
//             console.error(error);
//             res.status(500).send('Internal Server Error');
//         }
//     },
// };
