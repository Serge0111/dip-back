import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Res,
    Query,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { TicketService } from '../services/route.service';
import {
    Response,
} from 'express';
import { Ticket } from '../schemas/route.schema';
import { Vehicle } from '../schemas/vehicle.schema';
import { Combine } from '../schemas/combined.schema';

@ApiUseTags('ticket')
@Controller('ticket')
export class TicketController {

    public constructor(
        private routeService: TicketService,
    ) {}

    @Post('create')
    public async createRoute(@Body() data: any, @Res() res: Response): Promise<Response> {
        try {
            const { from, to, dateFrom, dateTo } = data;
            const createRoute: Ticket = {
                from,
                to,
                dateFrom: new Date(dateFrom),
                dateTo: new Date(dateTo),
            };
            const route: any = await this.routeService.createRoute(createRoute);
            if (!route) {
                throw new Error('can not create route');
            }
            const { transports } = data;
            const vehicles: any[] = [];
            if (transports && Array.isArray(transports)) {
                for (const vehicle of transports ) {
                    const createTransport: Vehicle = {
                        ...vehicle,
                        routeId: route._id,
                    };
                    const current: any = await this.routeService.createVehicle(createTransport);
                    vehicles.push(current);
                }
            }
            return res.status(HttpStatus.CREATED)
                .send({
                    data: { route, vehicles },
                });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).send({error: error.message});
        }
    }

    @Post('combine')
    public async createCombined(@Body() data: any, @Res() res: Response): Promise<Response> {
        try {
            const { routeId, combined } = data;
            const createCombine: Combine = {
                routeId,
                combined,
            };
            const combine: any = await this.routeService.createCombine(createCombine);
            return res.status(HttpStatus.CREATED)
                .send({
                    data: combine,
                });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).send({error: error.message});
        }
    }
    @Get('')
    public async getRoute(@Res() res: Response,
                          @Query() param: { from: string, to: string, dateFrom: Date, type: string }): Promise<Response> {
        try {
            const { from, to, dateFrom, type } = param;
            if (!from || !to) {
                throw new Error('from point and to point are required');
            }
            let query: {} = { from, to };
            if (dateFrom) {
                query = { ...query, dateFrom };
            }
            if (type) {
                query = { ...query, type };
            }
            const getRoutes: any[] = await this.routeService.getVehiclesForRoute(query);
            const routeIds: any[] = getRoutes.reduce( (prev: any[], curr: any) => {
                return [ ...prev, curr._id];
            }, []);
            const combine: any = await this.routeService
                .getCombined({ routeId: { $in: routeIds } });
            let addCombined: any | null = null;
            if (combine) {
                addCombined = await this.routeService.addCombined( combine, type);
            }
            return res.status(HttpStatus.CREATED)
                .send({
                    data:  {
                        routes: getRoutes[0],
                        combine: addCombined,
                    },
                });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).send({error: error.message});
        }
    }
}
