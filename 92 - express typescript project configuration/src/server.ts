import express from 'express';
import morgan from 'morgan';
import config from './config';
import chocolatesController from './controllers/chocolates-controller';
import { connectMySql } from './services/my-sql';
import auth from './auth';

const server = express();

// Middlewares
server.use(morgan('tiny'));
server.use(express.static('public'));
server.use(express.json());
server.use('/api/chocolates', chocolatesController);
server.use('/api/auth/', auth);

connectMySql(() => {
  server.listen(config.server.port, () => {
    console.log(`server is running on: http://${config.server.domain}:${config.server.port}`);
  });
});
