import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

export const getMyApplications = expressAsyncHandler(async (req: Request, res: Response) => {
    res.send('These are all your applications');
});

export const createApplication = expressAsyncHandler(async (req: Request, res: Response) => {
    res.send('Created a new application');
});

export const deleteApplication = expressAsyncHandler(async (req: Request, res: Response) => {
    res.send('Your application has been deleted');
});

export const updateApplication = expressAsyncHandler(async (req: Request, res: Response) => {
    res.send('Your application has been updated');
});

export const getApplication = expressAsyncHandler(async (req: Request, res: Response) => {
    res.send('This is a single application');
});
