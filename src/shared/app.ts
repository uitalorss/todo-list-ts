import 'express-async-errors';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { app } from './server';
import { dataSource } from './infra/orm/dataSource';
import { requestError } from './infra/middlewares/error';
import { router } from './infra/routes';

dataSource.initialize().then(() => {
    app.use(express.json());
    app.use(cors());
    app.use(router);

    app.use(requestError);

    app.listen(3000, () => console.log('Server is running on port 3000'));
});
