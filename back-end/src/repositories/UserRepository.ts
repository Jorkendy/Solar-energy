import {IUser, UserModel} from "../models/User";
import {IUserRepository} from "./IUserRepository";

export class UserRepository implements IUserRepository {
    private _userModel: UserModel;

    constructor(userModel: UserModel) {
        this._userModel = userModel;
    }

    async createUser(newUser: IUser): Promise<IUser> {
        return await this._userModel.create(newUser);
    }

    async getUserByUsername(username: string): Promise<IUser> {
        const query = {username};
        return await this._userModel.findOne(query);
    }

    async getUserByEmailOrUsername(email: string, username: string): Promise<IUser> {
        const query = {$or: [{email}, {username}]};
        return await this._userModel.findOne(query);
    }

     async getUserById(id: string): Promise<IUser> {
        return await this._userModel.findById(id);
    }

    async updateUser(id: string, updatedUser: IUser): Promise<IUser> {
        return await this._userModel.findByIdAndUpdate(id, updatedUser, {new: true});
    }
}
