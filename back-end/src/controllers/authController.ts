import {MongoError} from "mongodb";
import {IErrorResponse, ILoginResponse, IUserResponse} from "../models/responses";
import {UserRepository} from "../repositories/UserRepository";
import {IUser, User, UserRole} from "../models/User";
import {ILoginRequest, INewUserRequest} from "../models/requests";
import bcrypt from "bcrypt";
import {sign} from "jsonwebtoken";
import {get} from 'config';

export class AuthController {
    private static resolveErrorResponse(error: MongoError | null, message: string): IErrorResponse {
        return {
            thrown: true,
            error,
            message
        };
    }

    private readonly _userRepository = new UserRepository(User);

    async registerUser(requestBody: INewUserRequest): Promise<IUserResponse> {
        const username: string = requestBody.username;
        const password: string = requestBody.password;
        const email: string = requestBody.email;

        const existUser: IUser = await this._userRepository.getUserByEmailOrUsername(email, username);

        if (existUser instanceof MongoError) {
            throw AuthController.resolveErrorResponse(existUser, existUser.message);
        }

        if (existUser) {
            throw AuthController.resolveErrorResponse(null, 'Email or Username already existed.');
        }

        const newUser: IUser = new User();
        newUser.username = username;
        newUser.email = email;
        newUser.createdOn = new Date();
        newUser.updatedOn = new Date();
        newUser.role = UserRole.User;

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        return await <IUserResponse>this._userRepository.createUser(newUser);
    }

    async login(loginParams: ILoginRequest): Promise<ILoginResponse> {
        const username: string = loginParams.username;
        const password: string = loginParams.password;
        const fetchedUser: IUser = await this._userRepository.getUserByEmailOrUsername(null, username);
        const isMatched: boolean = await bcrypt.compareSync(password, fetchedUser.password);

        if (fetchedUser instanceof MongoError) {
            throw AuthController.resolveErrorResponse(fetchedUser, fetchedUser.message);
        }

        if (!fetchedUser) {
            throw AuthController.resolveErrorResponse(null, 'Does not exist');
        }

        if (!isMatched) {
            throw AuthController.resolveErrorResponse(null, 'Password does not match');
        }

        const payload = {user: fetchedUser};
        const token: string = sign(payload, process.env.JWT_SECRET || get('auth.jwt_secret'), {expiresIn: 1800});

        if (!token) {
            throw AuthController.resolveErrorResponse(null, 'Error signing payload');
        }

        try {
            return {
                token: `JWT ${token}`
            };
        } catch (error) {
            throw AuthController.resolveErrorResponse(
                error instanceof MongoError ? error : null,
                error instanceof MongoError ? error.message : 'Unexpected Error');
        }
    }
}
