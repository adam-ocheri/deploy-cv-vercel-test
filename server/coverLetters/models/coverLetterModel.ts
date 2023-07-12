import mongoose from 'mongoose';

const coverLetterSchema = new mongoose.Schema({
    // Data structure need to be defined here
});

const CoverLetter = mongoose.model('CoverLetter', coverLetterSchema);

export { CoverLetter };
