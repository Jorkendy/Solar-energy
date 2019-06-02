import {IUserProfile, UserRole} from "../User";

export interface IUserResponse {
    _id?: string;
    username?: string;
    email?: string;
    password?: string;
    createdOn?: Date;
    updatedOn?: Date;
    role?: UserRole;
    profile?: IUserProfile;
}
