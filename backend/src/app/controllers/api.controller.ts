import { Context, Get, HttpResponse, HttpResponseOK } from '@foal/core';

export class ApiController {
    @Get('/')
    index(ctx: Context): HttpResponse {
        return new HttpResponseOK('Hello world!');
    }
}
