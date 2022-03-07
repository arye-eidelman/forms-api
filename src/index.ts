import express from 'express';
import { formsRouter } from './routers/formsRouter';
import cors from 'cors';

const app = express();
const port = process.env.PORT || '8000';
app.use(cors({
  origin: 'http://localhost:3000',
  preflightContinue: false
}));

app.use(express.urlencoded());
app.use(express.json());

const errorHandler = (err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const env = process.env.NODE_ENV || 'development';
  console.error(err.stack)
  if (env === 'development') {
    res.status(500).json({ error: { message: err.message, name: err.name, stack: err.stack }, status: 500 })
  } else {
    res.status(500).json({ error: { message: 'Something broke!' }, status: 500 })
  }
}
app.use(errorHandler)

app.get('/', (req, res) => res.json({ apiStatus: "use /api/v1 prefix" }));
app.get('/api', (req, res) => res.json({ apiStatus: "use /api/v1 prefix" }));
app.get('/api/v1', (req, res) => res.json({ apiStatus: 'online, see src/index.ts and src/routers/** for available endpoints' }));
app.get('/api/v1/ping', (req, res) => res.json({ ping: "pong" }));
app.use('/api/v1/forms', formsRouter)

app.listen(port, () => {
  return console.log(`Server is listening on port ${port}`);
});