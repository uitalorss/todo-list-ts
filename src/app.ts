import 'reflect-metadata';
import { app } from './server';
import { dataSource } from './infra/orm/dataSource';

dataSource.initialize().then(() => {
    app.listen(3000, () => console.log('Server is running on port 3000'));
});
