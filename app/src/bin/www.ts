// import * as app from '../app';
import app from '../app';
import { createServer } from 'http';
import logger from '../config/logger';

const PORT: number = Number(process.env.PORT) || 3000;
const server = createServer(app);

server.listen(PORT, () => {
  logger.info(`Port : ${PORT} 서버 가동중 ...`);
});
