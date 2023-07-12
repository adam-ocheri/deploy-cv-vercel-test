import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { Resume } from '../models/resumeModels';
import { ZodError } from 'zod';
import { ResumeValidator } from '../utilities/resumeValidator';

// @desc    Get resumes
// @route   GET /api/resumes
// @access  Private
export const getResumes = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const resumes = await Resume.find({});
        res.status(200).json({ resumes });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ message: error.issues.map((issue) => issue.message).join(', ') });
        } else {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
});

// @desc    Create resume
// @route   POST /api/resumes
// @access  Private
export const createResume = asyncHandler(async (req: Request, res: Response) => {
    try {
        const result = ResumeValidator.parse(req.body);

        await Resume.create(result);

        res.status(201).json(result);
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ message: error.issues.map((issue) => issue.message).join(', ') });
        } else {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
});

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
export const updateResume = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!resume) {
            res.status(404).json({ message: 'Resume not found' });
            return;
        }

        res.status(200).json({ resume });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ message: error.issues.map((issue) => issue.message).join(', ') });
        } else {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
});

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
export const deleteResume = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            res.status(401).json({ message: 'Resume not found' });
        }

        await resume?.deleteOne();

        res.status(200).json({ message: `deleted resume #${req.params.id} successfully` });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ message: error.issues.map((issue) => issue.message).join(', ') });
        } else {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
});
