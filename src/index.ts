import express, { Request, Response } from 'express';
import routes from './routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3000, () => {
    console.log('A API esta funcionando perfeitamente!');
})
