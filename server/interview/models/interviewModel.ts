import { Schema, Types, model } from 'mongoose';



const interviewModel = model('Interview', new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User', // If we moved to a microservice then we can't reference this
        required: true
    },
}));

const startInterview = async ({ userId }: {
    userId: Types.ObjectId;
    interviewId?: Types.ObjectId;
}) => {
    const interview = await interviewModel.create({
        userId
    });


    const doc = await interview.save();

    // should handle the error
    return doc._id;
};

export const Interview = {
    startInterview
} as const;