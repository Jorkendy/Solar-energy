import {Document, Model, model, Schema} from "mongoose";

export const UserSchema = new Schema({
    username: String,
    password: String,
    createdOn: Date,
    updatedOn: Date,
    role: {
        type: String,
        enum: ['User', 'Admin']
    },
    email: String,
    profile: {
        firstName: String,
        lastName: String,
        fullName: String,
    }
}, {
    collection: 'user'
});

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    createdOn?: Date;
    updatedOn?: Date;
    role?: UserRole;
    profile?: IUserProfile;
}

export enum UserRole {
    Admin = 'Admin' as any,
    User = 'User' as any
}

export interface IUserProfile {
    firstName?: string;
    lastName?: string;
    fullName?: string;
}

export interface IUserVm {
    _id?: string;
    username: string;
    password: string;
    email: string;
    createdOn?: Date;
    updatedOn?: Date;
    role?: UserRole;
    profile?: IUserProfile;
}

export type UserModel = Model<IUser>;
export const User: UserModel = model<IUser>('User', UserSchema) as UserModel;
