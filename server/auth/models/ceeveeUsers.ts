import mongoose, { Document, Schema } from 'mongoose';

export interface ICeeveeUser extends Document {
    ceevee_id: string;
    username: string;
    profilePicture: string;
    ceevee_accesstoken?: string;
    email?: string;
    password?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}

const CeeveeUserSchema: Schema = new mongoose.Schema({
    username: { type: String },
    ceevee_accesstoken: { type: String },
    email: { type: String },
    password: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    passwordChangedAt: { type: Date },
});

export default mongoose.model<ICeeveeUser>('CeeveeUser', CeeveeUserSchema);
