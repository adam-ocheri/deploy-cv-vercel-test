import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    // Data structure need to be defined here
});

const Application = mongoose.model('Application', applicationSchema);

export { Application };
