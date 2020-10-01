// 3p
import { createApp } from '@foal/core';
import { Application } from 'express';
import * as request from 'supertest';
import { createConnection, getConnection } from 'typeorm';

// App
import { AppController } from '../app/app.controller';

describe('The server', () => {
    let app: Application;

    before(async () => {
        await createConnection();
        app = createApp(AppController) as Application;
    });

    after(() => getConnection().close());

    it('should return a 200 status on GET / requests.', () => {
        return request(app).get('/').expect(200);
    });
});
