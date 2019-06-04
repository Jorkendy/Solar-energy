import express from 'express'
import {AuthController} from "./controllers/authController";
import * as passport from 'passport';
import {MailController} from './controllers/mailController';

export function RegisterRoutes(app: express.Application) {
    app.post('/auth/sign-in', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const controller = new AuthController();
        const promise = controller.login(req.body);
        promiseHandler(controller, promise, res, next).then();
    });

    app.post('/auth/register', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const controller = new AuthController();
        const promise = controller.registerUser(req.body);
        promiseHandler(controller, promise, res, next).then();
    });

    app.get('/send-mail', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const controller = new MailController();
        const promise = controller.sendMail();
        promiseHandler(controller, promise, res, next).then();
    });

    function authenticateMiddleware(strategy: string) {
        return passport.authenticate(strategy, {session: false});
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                if (data) {
                    response.status(200).json(data);
                } else {
                    response.status(204).end();
                }
            })
            .catch((error: any) => response.status(500).json(error));
    }
}
