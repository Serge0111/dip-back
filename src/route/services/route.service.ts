import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { Ticket } from '../schemas/route.schema';
import { Vehicle } from '../schemas/vehicle.schema';
import { Combine } from '../schemas/combined.schema';

@Injectable()
export class TicketService {
    public constructor(
        @Inject('RouteModelToken') private readonly routeModel: Model<any>,
        @Inject('VehicleModelToken') private readonly vehicleModel: Model<any>,
        @Inject('CombineModelToken') private readonly combineModel: Model<any>,
    ) {
    }

    public async getRoutes(query: any = {}, projection: any = {}): Promise<any> {
        return await this.routeModel.find(query, projection)
            .lean()
            .exec();
    }

    public async getTransport(query: any = {}, projection: any = {}): Promise<any> {
        return await this.vehicleModel.find(query, projection)
            .lean()
            .exec();
    }

    public async createRoute(data: Ticket): Promise<any> {
        return await this.routeModel.create(data);
    }

    public async createVehicle(data: Vehicle): Promise<any> {
        return await this.vehicleModel.create(data);
    }

    public async createCombine(data: Combine): Promise<any> {
        return await this.combineModel.create(data);
    }

    public async getCombined(query: any = {}): Promise<any> {
        return await this.combineModel.findOne(query).lean().exec();
    }

    public async getVehiclesForRoute(query: any = {}): Promise<any> {
        return await this.routeModel.aggregate([
            {
                $match: query,
            },
            {
               $lookup:
                  {
                     from: 'vehiclemodels',
                     localField: '_id',
                     foreignField: 'routeId',
                     as: 'vehicles',
                 },
            },
         ]);
    }

    public async addCombined(combine: any, transport: string | undefined): Promise<any> {
        const vehicles: any[] = [];
        for ( const combined of combine.combined) {
            if ( transport === 'train') {
                const trains: any[] = await this.getTransport({_id: { $in:  combined.train }});
                vehicles.push({
                    transport: trains,
                });
            } else if (transport === 'bus') {
                const buses: any[] = await this.getTransport({_id: { $in:  combined.bus }});
                vehicles.push({
                    transport: buses,
                });
            } else {
                const all: any[] = await this.getTransport({_id: { $in:  combined.all }});
                vehicles.push({
                    transport: all,
                });
            }
        }
        return vehicles;
    }
}
