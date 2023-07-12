import { Document, Schema, model } from "mongoose";

export interface IOauthUser extends Document {
  linkedinId: string,
  firstName: {
    localized: {
      en_US: string,
    },
  },
  lastName: {
    localized: {
      en_US: string,
    },
  },
  profilePicture: string,
  accessToken?: string,
}

const OauthUserSchema: Schema = new Schema({
  linkedinId: { type: String },
  firstName: {
    localized: {
      en_US: { type: String },
    },
  },
  lastName: {
    localized: {
      en_US: { type: String },
    },
  },
  profilePicture: { type: String },
  accessToken: { type: String },
});

export default model<IOauthUser>('OauthUser', OauthUserSchema);