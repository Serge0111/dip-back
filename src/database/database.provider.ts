// tslint:disable-next-line:no-var-requires
const mongoose: any = require('mongoose');
import { ConfigService } from '../config.service';
// tslint:disable-next-line: no-any
export const databaseProviders: any = [
    {
        provide: 'DbConnectionToken',
        useFactory: async (config: ConfigService): Promise<any> => {
            // tslint:disable-next-line: no-any
            (mongoose as any).Promise = global.Promise;
            const dbConnection: any = mongoose.connection;
            const host: string = config.get('dbhost');

            const connectionConfig: { autoIndex: boolean, useCreateIndex: boolean } = {
                autoIndex: true,
                useCreateIndex: true,
            };
            await mongoose.connect(host, {config: connectionConfig});

            return dbConnection;
        },
        inject: [ConfigService],
    },
];
