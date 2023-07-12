import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { Profile } from '../models/profileModel';

// Define the userProfile property in the ICeeveeUser interface
declare module 'mongoose' {
    interface Document {
        userProfile: string;
    }
}

// @desc    Get Profile
// @route   GET /api/profile
// @access  Private
export const getMyProfile = expressAsyncHandler(async (req: Request, res: Response) => {
    const { profile: profileId } = req.headers;

    const userProfile = await Profile.findOne({ _id: profileId }, req.body);
    console.log('profile id from get user:', profileId);
    console.log('req. body from get user:', req.body);

    if (!userProfile) {
        res.status(404);
        throw new Error('Profile not found');
    }
    console.log('Here is my Profile:', userProfile);
    res.json(userProfile);
});

// @desc    Update Profile
// @route   PUT /api/profile
// @access  Private
export const updateProfile = expressAsyncHandler(async (req: Request, res: Response) => {
    const { profile: profileId } = req.headers;
    //body or headers
    // console.log('req headers of updateProfile backend', req.headers);

    // Look for the profile with correct userId
    const userProfile = await Profile.findOne({ _id: profileId });
    if (!userProfile) {
        res.status(404);
        throw new Error('Profile not found');
    }
    const updatedProfile = await Profile.findOneAndUpdate({ _id: profileId }, req.body, { new: true });
    res.json(updatedProfile);
});

export const deleteProfile = expressAsyncHandler(async (req: Request, res: Response) => {
    res.send('Your profile has been deleted');
});

// we currently don't use this func
export const createProfile = expressAsyncHandler(async (req: Request, res: Response) => {
    const {
        contact,
        jobs,
        education,
        skills,
        volunteer,
        certifications,
        courses,
        honorsAwards,
        languages,
        projects,
        publications,
        patents,
        recommendations,
    } = req.body;

    const userId = req.body._id;

    const userProfile = {
        contact,
        jobs,
        education,
        skills,
        volunteer,
        certifications,
        courses,
        honorsAwards,
        languages,
        projects,
        publications,
        patents,
        recommendations,
        userId,
    };
    console.log('USER id from createprofile', userId);
    console.log('PROFILE', userProfile);

    const newProfile = await Profile.findOneAndUpdate(userProfile);
    res.status(201).json({
        message: 'Profile created',
        profile: newProfile,
    });
});
