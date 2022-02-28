import express from 'express';
import { formsRouter } from './routers/formsRouter';

const app = express();
const port = process.env.PORT || '8000';

app.get('/', (req, res) => res.json({apiStatus: "use /api/v1 prefix"}));
app.get('/api', (req, res) => res.json({apiStatus: "use /api/v1 prefix"}));
app.get('/api/v1', (req, res) => res.json({apiStatus: 'online, see src/index.ts and src/routers/** for available endpoints'}));
app.get('/api/v1/ping', (req, res) => res.json({ping: "pong"}));
app.use('/api/v1/forms', formsRouter)

app.listen(port, () => {
  return console.log(`Server is listening on port ${port}`);
});