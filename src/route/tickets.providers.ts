import { Connection, Document, Model } from 'mongoose';
import { routeSchema } from './schemas/route.schema';
import { vehicleSchema } from './schemas/vehicle.schema';
import { combinedSchema } from './schemas/combined.schema';

// tslint:disable-next-line: no-any
export const ticketProviders: any[] = [
    {
      provide: 'RouteModelToken',
      useFactory: (connection: Connection): Model<Document> => connection.model('RouteModel', routeSchema),
      inject: ['DbConnectionToken'],
    },
    {
      provide: 'VehicleModelToken',
      useFactory: (connection: Connection): Model<Document> => connection.model('VehicleModel', vehicleSchema),
      inject: ['DbConnectionToken'],
    },
    {
      provide: 'CombineModelToken',
      useFactory: (connection: Connection): Model<Document> => connection.model('CombineModel', combinedSchema),
      inject: ['DbConnectionToken'],
    },
  ];
