import 'source-map-support/register';

// std
import * as http from 'http';

// 3p
import { Config, createApp } from '@foal/core';
import { createConnection } from 'typeorm';

// App
import { AppController } from './app/app.controller';
import { Application } from 'express';

async function main() {
    await createConnection();

    const app = createApp(AppController) as Application;

    const httpServer = http.createServer(app);
    const port = Config.get2('port', 'number', 3001);
    httpServer.listen(port, () => {
        console.log(`Listening on port ${port}...`);
    });
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
