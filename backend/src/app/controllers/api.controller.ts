import { Context, Get, HttpResponse, HttpResponseOK } from '@foal/core';
import { CentreServiceScolaire } from '../../../../common/src/schemas';

export class ApiController {
    @Get('/')
    index(ctx: Context): HttpResponse {
        return new HttpResponseOK('Helloooooooo world!');
    }

    @Get('/centres-service-scolaire')
    css(ctx: Context): HttpResponse {
        const data: CentreServiceScolaire[] = [{ id: 2, name: 'test' }];
        return new HttpResponseOK(data);
    }
}
