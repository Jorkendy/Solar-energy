import {authenticate, PassportStatic} from 'passport';
import {ExtractJwt, Strategy, StrategyOptions, VerifiedCallback} from 'passport-jwt';
import {get} from 'config';
import {MongoError} from "mongodb";
import {IUserResponse} from "../../models/responses";
import {UserRepository} from "../../repositories/UserRepository";
import {User} from "../../models/User";

export const authenticateUser = (passport: PassportStatic) => {
    const options: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: process.env.JWT_SECRET || get('auth.jwt_secret')
    };
    const _userRepository = new UserRepository(User);

    passport.use(new Strategy(options, async (jwtPayload: IJwtPayload, done: VerifiedCallback) => {
        const result = await <IUserResponse>_userRepository.getUserById(jwtPayload.user._id);

        if (result instanceof MongoError) return done(result, false);
        if (!result) {
            return done(null, false);
        } else {
            return done(null, result, {issuedAt: jwtPayload.iat});
        }
    }));
};

export function expressAuthentication(strategy: string) {
    return authenticate(strategy, {session: false});
}

interface IJwtPayload {
    user?: IUserResponse;
    iat?: Date;
}

