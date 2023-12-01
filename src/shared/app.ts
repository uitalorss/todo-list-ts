import 'reflect-metadata';
import { app } from './server';
import { dataSource } from './infra/orm/dataSource';
import { requestError } from './infra/middlewares/error';

dataSource.initialize().then(() => {
    app.use(requestError);

    app.listen(3000, () => console.log('Server is running on port 3000'));
});
