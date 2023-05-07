import express, { Request, Response, Express, NextFunction } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { PORT } from './config/env.config';
import routes from './pkg/routes';
import db from './config/db.config';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(morgan('dev'));



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/users', routes.user);
app.use('/api/v1/teams', routes.team);
app.use('/api/v1/fixtures', routes.fixture);
app.use('/api/v1/search', routes.search);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message!, error: err.name! });
});

app.route('*').all((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found on this server' });
});

const start = async () => {
  try {
    await db.asPromise().then(() => console.log('Database connected'));
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('error', error);
  }
};

start();


export default app;
