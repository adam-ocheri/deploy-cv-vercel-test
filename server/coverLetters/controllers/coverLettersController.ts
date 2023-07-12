import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

export const getMyCoverLetter = expressAsyncHandler(async (req: Request, res: Response) => {
    res.send('Just got your cover letter');
});

export const createCoverLetter = expressAsyncHandler(async (req: Request, res: Response) => {
    res.send('Created a new cover letter');
});

export const deleteCoverLetter = expressAsyncHandler(async (req: Request, res: Response) => {
    res.send('Your cover letter has been deleted');
});
