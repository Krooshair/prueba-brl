import express from 'express'
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';

//RUTAS
import v1Routes from './shared/routes/v1Routes';

config();

const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

//APP USE
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//ROUTES
app.use('/api/v1', v1Routes)

//SERVER LISTEN
app.listen(port, () => {
  console.log(`Server in running ${host}:${port}`)
})