import {IUser} from '../models/User';

export interface IUserRepository {
    createUser(newUser: IUser): void;

    getUserByUsername(username: string): void;

    getUserByEmailOrUsername(email: string, username: string): Promise<IUser>;

    getUserById(id: string): void;

    updateUser(id: string, updatedUser: IUser): void;
}
