import { Request, Response } from "express";
import OauthUser  from '../models/oauthUsers';
import CeeveeUser from '../models/ceeveeUsers';

export const logoutController = {
  async logout(req: Request, res: Response): Promise<void> {
    console.log("req.header:", req.headers);
    console.log("req.body:", req.body);

    try {

      const { profilePicture } = req.headers;

      // Find the user in the database
      const oauthUserProfile = await OauthUser.findOne({ profilePicture: profilePicture });
      const ceeveeUserProfile = await CeeveeUser.findOne({ profilePicture: profilePicture});

      console.log(oauthUserProfile, "oauthUserProfile");
      console.log(ceeveeUserProfile, "ceeveeUserProfile");
    
      // Delete the user from the database
      if (oauthUserProfile) {
        await oauthUserProfile.deleteOne();
      }

      if (ceeveeUserProfile) {
        await ceeveeUserProfile.deleteOne();
      }

      // Clear the cookie
      res.cookie('ceevee_accesstoken', "", { maxAge: 0, httpOnly: false });

      // Send a success response
      res.status(200).send({ message: 'Logout successful'}); 
    } catch (error) {
    //  console.error(error)
      res.status(500).send('Internal Server Error')
    }
  }
}

// export const logoutController = {
//   async logout(req: Request, res: Response): Promise<void> {
//     console.log("req.header:", req.headers);
//     console.log("req.body:", req.body);

//     const { profilePicture } = req.body;
//     const ceevee_accesstoken = req.headers.authorization?.split(' ')[1];
// try {
//       if (!ceevee_accesstoken) {
//         res.status(401).json({ message: ' no ceevee_accesstoken Unauthorized' });
//         return;
//       }

//       // Find ceeveeUser by  profilePicture  
//       // Find OauthUser by matching profilePicture with CeeveeUser
//         const ceeveeUserProfile = await CeeveeUser.findOne({ profilePicture });
//         const oauthUserProfile = await OauthUser.findOne({ profilePicture });
  
//         if (oauthUserProfile?.profilePicture === ceeveeUserProfile?.profilePicture) {
//           await oauthUserProfile?.deleteOne();
//           await ceeveeUserProfile?.deleteOne();
//         }
//                 // Clear the cookie
//       res.cookie('ceevee_accesstoken', "", { maxAge: 0, httpOnly: false });
        
//       //Send a success response
//       res.status(200).send({ message: 'Logout successful'}); 

//       }  catch (error) {
//              console.error(error)
//               res.status(500).send('Internal Server Error')
//             }

//           }
//         }
        

// get ceevee_accesstoken from the frontend
// search for user from the CeeveeUser collection using the profilePicture 
// match the profilePicture from the CeeveeUser to the OauthUser
// use find one and delete from both CeeveeUser and the OuthUser  
