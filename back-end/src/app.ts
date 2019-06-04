import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose, {Mongoose} from "mongoose";
import {get} from "config";
import {MongoError} from 'mongodb';

import {authenticateUser} from "./middlewares/security/Passport";
import {setupLogging, winstonLogger} from "./middlewares/common/WinstonLogger";

import './controllers/authController';
import './controllers/mailController';
import {RegisterRoutes} from "./routes";

class App {
    public app: express.Application;
    public mongooseConnection: mongoose.Connection;

    constructor() {
        this.app = express();
        setupLogging(this.app);
        this.configure();
        this.routes();
    }

    private configure(): void {
        (mongoose as Mongoose).Promise = global.Promise;
        mongoose.connect(process.env.MONGO_URI || get('mongo.mongo_uri'), {useNewUrlParser: true}).then(
            () => {
                this.mongooseConnection = mongoose.connection;
                App.onMongoConnection();
            }).catch(
            (error: MongoError) => {
                App.onMongoConnectionError(error);
            });

        this.app.use(cors());
        this.app.options('*', cors());

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false,
            limit: '5mb',
            parameterLimit: 5000
        }));

        this.app.use(passport.initialize());
        this.app.use(passport.session());
        authenticateUser(passport);

        this.app.get('/', (req: express.Request, res: express.Response) => {
            res.send('Server worked');
        });
    }

    private routes(): void {
        RegisterRoutes(this.app);
    }

    private static onMongoConnection(): void {
        winstonLogger.info('-----Connected to Database');
    }

    private static onMongoConnectionError(error: MongoError): void {
        winstonLogger.error(`-----Error on connection to database: ${error}
     `);
    }
}

export default new App();
